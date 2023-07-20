import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConnexionData } from 'src/app/models/connexion.model';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionData: ConnexionData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  login() {
    let verif = true;
    // Vérification que les champs sont bien remplis 
    if (this.connexionData.username === '' || this.connexionData.password === '') {
      verif = false;
      alert("Veuillez remplir tous les champs");
    }

    if (verif) {
      this.authService.login(this.connexionData.username, this.connexionData.password).subscribe(
        (response) => {
          if (response.success) {
            // Rediriger l'utilisateur vers la page d'accueil ou une autre page appropriée
            alert("Connexion réussie")
            this.router.navigate(['all-produit']);
          } else {
            // Afficher un message d'erreur pour indiquer que les informations d'identification sont incorrectes
            alert('Identifiants incorrects');
          }
        },
        (error) => {
          // Gérer les erreurs de la requête HTTP
          alert( error.error.message);
        });
    }
  }

  public afficherInput: boolean = false;

  public toggleReset(): void {
    this.afficherInput = !this.afficherInput; 
  }


}