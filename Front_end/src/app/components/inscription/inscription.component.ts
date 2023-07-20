import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InscriptionData } from 'src/app/models/inscription.model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit{
  /* Informations à l'inscription */
registerData: InscriptionData = {
  name: '',
  password: '',
  confirm: '',
  birthdate: new Date('0000-00-00'),
  mail: '',
  tel: 0,
  adresse: '',
  languePreferee: '',
  roles: ''
};


  constructor(private router: Router, private authService: AuthService){}
  ngOnInit(){}

  /*Fonction qui renvoie vers une autre page */
  redirectToPage(pageName : string) {
    /*Ce qu'il faut écrire dans pageName se trouve dans les paths de app-routing.module*/
    this.router.navigate([`${pageName}`]);
  }


  register() {
    /* verif est une variable qui vérifie si les données sont valides avant d'envoyer la requête, par défaut elle est init à true */
    let verif = true;
    /* On regarde si les champs obligatoires ne sont pas vides */
    if (
      this.registerData.name === '' || this.registerData.password === '' ||
      this.registerData.confirm === '' || !this.registerData.birthdate || 
      this.registerData.mail === '' || this.registerData.tel === null || 
      this.registerData.adresse === '' || this.registerData.adresse === '' 
      ) {
      verif = false;
      alert("vide");
    }
    /* On regarde si le mot de passe à au moins 8 caractères */
    else if (this.registerData.password.length < 7){
      verif = false;
      alert("mot de passe trop court");
    }
    /* On regarde si la confirmation de mot de passe est correcte*/
    else if(this.registerData.password !== this.registerData.confirm){
      verif = false;
      alert("mot de passes différents");
    }
    /* On vérifie si la date est correcte */
    else if (isNaN(new Date(this.registerData.birthdate).getTime())){
      verif = false;
      alert("date invalide");
    }
    /* On vérifie si l'email est correct */
    else if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(this.registerData.mail)==false){
      verif = false;
      alert("email invalide");
    }

    if (verif){
            this.authService.inscrire(
            this.registerData.name, 
            this.registerData.password,
            this.registerData.birthdate,
            this.registerData.mail, 
            this.registerData.tel, 
            this.registerData.adresse, 
            this.registerData.languePreferee,
            // this.registerData.roles
            ).subscribe(
          (response) => {
            if (response.success) {
              // Rediriger l'utilisateur vers la page d'accueil ou une autre page appropriée
              alert("Inscription réussie")
              this.router.navigate(['all-produit']);
          }
        },
        (error) => {
          // Gérer les erreurs de la requête HTTP
          alert('Erreur lors de la requête inscription'+ error);
        }
        );
    }
  }
}


