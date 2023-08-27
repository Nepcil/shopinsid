import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConnexionData } from 'src/app/models/connexion.model';
import { CookieService } from 'ngx-cookie-service'; // Importer CookieService

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  // Données de connexion initialisées avec des valeurs par défaut
    connexionData: ConnexionData = {
    email: '',
    password: '',
    rememberMe: false // Ajout de la propriété rememberMe pour gérer l'état de la case à cocher "Se souvenir de moi"
  };

  // Injecter AuthService, Router et CookieService dans le constructeur
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    // Lire l'état de la case à cocher du cookie et l'utiliser pour définir l'état initial
    this.connexionData.rememberMe = this.cookieService.get('rememberMe') === 'true';
  }

  // Méthode pour rediriger vers une autre page
  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  // Méthode pour gérer la connexion de l'utilisateur
  login() {
    let verif = true;
    // Vérification que les champs sont bien remplis 
    if (this.connexionData.email === '' || this.connexionData.password === '') {
      verif = false;
      alert("Veuillez remplir tous les champs");
    }

    if (verif) {
      // Appel à la méthode login du service d'authentification
      this.authService.login(this.connexionData.email, this.connexionData.password, this.connexionData.rememberMe).subscribe(
        (response) => {
          if (response.success) {
            // Rediriger l'utilisateur vers la page d'accueil ou une autre page appropriée
            alert("Connexion réussie")
            window.location.reload();

          } else {
            // Afficher un message d'erreur pour indiquer que les informations d'identification sont incorrectes
            alert('Identifiants incorrects');
          }
        },
        (error) => {
          // Gérer les erreurs de la requête HTTP
          alert(error.error.message);
        });

      // Stocker l'état de la case à cocher dans un cookie
      this.cookieService.set('rememberMe', this.connexionData.rememberMe.toString());
    }
  }

  // Variable pour gérer l'affichage du formulaire de réinitialisation du mot de passe
  public afficherInput: boolean = false;

  // Méthode pour basculer l'affichage du formulaire de réinitialisation du mot de passe
  public toggleReset(): void {
    this.afficherInput = !this.afficherInput;
  }
}
