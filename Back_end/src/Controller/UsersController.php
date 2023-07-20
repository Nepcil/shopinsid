<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Entity\Session;
use App\Entity\Users;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\JWT;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UsersController extends AbstractController
{
    private $userRepository;
    private $entityManager;
    private $passwordHasher;

    public function __construct(UsersRepository $userRepository, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $name = $data['name'];
        $password = $data['password'];
        $birthdate = $data['birthdate'];
        $email = $data['email'];
        $tel = $data['tel'];
        $adresse = $data['adresse'];
        $languePreferee = $data['languePreferee'];
        $roles = $data['roles'];

        if (empty($name) || empty($password) || empty($birthdate) || empty($email)) {
            return $this->json(['message' => 'Informations manquantes'], 400);
        }

        $existingUser = $this->userRepository->findOneBy(['email' => $email]);
        if ($existingUser) {
            return $this->json(['message' => 'Adresse e-mail déjà utilisée'], 400);
        }

        // Créer un nouvel utilisateur
        $user = new Users();
        $user->setNom($name);
        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
        $user->setMotdepasse($hashedPassword);
        $user->setDatedenaissance(new \DateTime($birthdate));
        $user->setEmail($email);
        $user->setTel($tel);
        $user->setAdresse($adresse);
        $user->setLanguePreferee($languePreferee);
        $user->setRoles($roles);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Inscription réussie'], 200);
    }

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['password'];

        if (empty($email) || empty($password)) {
            return $this->json(['message' => 'Informations manquantes'], 400);
        }

        $user = $this->userRepository->findOneBy(['email' => $email]);
        if (!$user || !$this->passwordHasher->isPasswordValid($user, $password)) {
            return $this->json(['success' => false, 'message' => 'Informations invalides'], 401);
        }

        // Vérifier s'il existe un token actif pour cet utilisateur
        $activeToken = $this->entityManager->getRepository(Session::class)->findOneBy([
            'iduser' => $user->getId(),
            'statut' => true
        ]);

        if (!$activeToken) {
            // Générer un nouveau token
            $tokenPayload = [
                'sub' => $user->getId(),
                'exp' => time() + 3600
            ];
            $jwtSecretKey = '4680'; // Remplacez par votre clé secrète
            $newToken = JWT::encode($tokenPayload, $jwtSecretKey, 'HS256');

            // Ajouter le nouveau token à la table session
            $session = new Session();
            $session->setToken($newToken);
            $session->setIdUser($user->getId());
            $session->setStatut(true);
            $session->setDateDebut(new \DateTime());
            $session->setDateFin(new \DateTime('9999-12-31')); // Date de fin très éloignée dans le futur car le champs ne peut pas etre null

            $this->entityManager->persist($session);
            $this->entityManager->flush();
        } else {
            $newToken = $activeToken->getToken();
        }

        return $this->json(['success' => true, 'message' => 'Login avec succès', 'token' => $newToken, 'userId' => $user->getId()], 200);
    }

    /**
     * @Route("/logout", name="logout", methods={"POST"})
     */
    public function logout(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $userId = $data['userId'];

        // Vérifier si l'utilisateur a un token actif
        $activeToken = $this->entityManager->getRepository(Session::class)->findOneBy([
            'iduser' => $userId,
            'statut' => true
        ]);

        if ($activeToken) {
            // Désactiver le token en mettant le statut à false
            $activeToken->setStatut(false);
            // Mettre à jour la date de fin du token
            $activeToken->setDateFin(new \DateTime());
            $this->entityManager->flush();
        }

        return $this->json(['success' => true, 'message' => 'Déconnexion réussie', 'userId' => $userId], 200);
    }

    /**
     * @Route("/contact", name="contact", methods={"POST"})
     */
    public function contact(Request $request)
    {
    $data = json_decode($request->getContent(), true);
    $token = $data['token'];
    $email = $data['email'];
    $nom = $data['nom'];
    $message = $data['message'];


    // Vérifier si le token existe et est actif
    $activeToken = $this->entityManager->getRepository(Session::class)->findOneBy([
        'token' => $token,
        'statut' => true
    ]);

    $user = $this->userRepository->findOneBy(['email' => $email]);
    
    if ($activeToken) {
    
        $newMessage = new Contact();
        $newMessage->setEmail($email);
        $newMessage->setNom($nom);
        $newMessage->setMessage($message);
        $newMessage->setDatemessage(new \DateTime());
        $newMessage->setUsersid($user->getId());
        
        $this->entityManager->persist($newMessage);
        $this->entityManager->flush();
    } else {
        // Gérer l'erreur lorsque le token est invalide ou n'existe pas
        return $this->json(['success' => false, 'message' => 'Token invalide ou introuvable'], 400);
    }

    return $this->json(['success' => true, 'message' => 'Message envoyé!'], 200);
    }
}
