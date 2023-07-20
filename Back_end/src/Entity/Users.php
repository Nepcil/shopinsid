<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

/**
 * Users
 *
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="App\Repository\UsersRepository")
 */
class Users implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @var int
     *
     * @ORM\Column(name="ID", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Nom", type="string", length=100, nullable=true)
     */
    private $nom;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Prenom", type="string", length=100, nullable=true)
     */
    private $prenom;

    /**
     * @var string|null
     *
     * @ORM\Column(name="MotDePasse", type="string", length=100, nullable=true)
     */
    private $motdepasse;

    /**
     * @var string|null
     *
     * @ORM\Column(name="LanguePreferee", type="string", length=50, nullable=true)
     */
    private $languepreferee;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Adresse", type="string", length=200, nullable=true)
     */
    private $adresse;

    /**
     * @var int|null
     *
     * @ORM\Column(name="Tel", type="integer", nullable=true)
     */
    private $tel;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="DateDeNaissance", type="datetime", nullable=true)
     */
    private $datedenaissance;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=100, nullable=false)
     */
    private $email;

    /**
     * @var array
     *
     * @ORM\Column(name="roles", type="json", nullable=false)
     */
    private $roles = ['ROLE_USER'];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(?string $prenom): self
    {
        $this->prenom = $prenom;
        return $this;
    }

    public function getMotdepasse(): ?string
    {
        return $this->motdepasse;
    }

    public function setMotdepasse(?string $motdepasse): self
    {
        $this->motdepasse = $motdepasse;
        return $this;
    }

    public function getLanguepreferee(): ?string
    {
        return $this->languepreferee;
    }

    public function setLanguepreferee(?string $languepreferee): self
    {
        $this->languepreferee = $languepreferee;
        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): self
    {
        $this->adresse = $adresse;
        return $this;
    }

    public function getTel(): ?int
    {
        return $this->tel;
    }

    public function setTel(?int $tel): self
    {
        $this->tel = $tel;
        return $this;
    }

    public function getDatedenaissance(): ?\DateTimeInterface
    {
        return $this->datedenaissance;
    }

    public function setDatedenaissance(?\DateTimeInterface $datedenaissance): self
    {
        $this->datedenaissance = $datedenaissance;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->motdepasse;
    }

    public function getSalt()
    {
        // La méthode getSalt() est requise par l'interface UserInterface,
        // mais vous n'avez pas besoin d'un sel pour encoder le mot de passe
        // dans cet exemple. Vous pouvez laisser cette méthode vide.
    }

    public function getUsername(): ?string
    {
        return $this->email;
    }

    public function eraseCredentials()
    {
        // La méthode eraseCredentials() est requise par l'interface
        // PasswordAuthenticatedUserInterface, mais en général, vous
        // n'avez pas besoin de faire quoi que ce soit ici. Si vous voulez
        // effacer les informations sensibles stockées sur l'utilisateur,
        // vous pouvez le faire ici. Dans cet exemple, nous n'avons rien à faire.
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getIsAdmin(): bool
    {
        $roles = $this->roles ?: []; // Utilisez un tableau vide si $this->roles est null

        // Vérifiez si l'utilisateur a le rôle "admin" dans ses rôles
        return in_array('ROLE_ADMIN', $roles);
    }

    public function setIsAdmin(bool $isAdmin): void
    {
        $roles = $this->roles ?: []; // Utilisez un tableau vide si $this->roles est null

        if ($isAdmin) {
            // Ajoutez le rôle d'administrateur si $isAdmin est vrai
            if (!in_array('ROLE_ADMIN', $roles)) {
                $roles[] = 'ROLE_ADMIN';
            }
        } else {
            // Supprimez le rôle d'administrateur si $isAdmin est faux
            $roles = array_diff($roles, ['ROLE_ADMIN']);
        }

        $this->roles = $roles;
    }
}