import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InscriptionData } from 'src/app/models/inscription.model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  // Déclaration du formulaire
  registerForm!: FormGroup;

  // Injection des services nécessaires dans le constructeur
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  // Getter pour accéder facilement aux contrôles du formulaire
  get f() { return this.registerForm.controls; }

  // Initialisation du composant
  ngOnInit() {
    // Création du formulaire avec les contrôles et leurs validations
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: [''],
      password: ['', [Validators.required, Validators.minLength(8)]], // Validation de la longueur minimale du mot de passe
      confirm: ['', Validators.required],
      birthdate: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: [null],
      adresse: ['', Validators.required],
      languePreferee: ['', Validators.required],
      role: ['user', Validators.required]
    }, { validator: this.checkPasswords }); // Ajout du validateur personnalisé
  }

  // Méthode pour gérer l'inscription
  register() {
    // Vérification de la validité du formulaire
    if (this.registerForm.valid) {
      // Création des données d'inscription
      const registerData: InscriptionData = {
        nom: this.registerForm.value.nom,
        prenom: this.registerForm.value.prenom,
        password: this.registerForm.value.password,
        confirm: this.registerForm.value.confirm,
        birthdate: this.registerForm.value.birthdate,
        email: this.registerForm.value.email,
        tel: this.registerForm.value.tel,
        adresse: this.registerForm.value.adresse,
        languePreferee: this.registerForm.value.languePreferee,
        role: this.registerForm.value.role
      };

      // Appel du service d'authentification pour inscrire l'utilisateur
      this.authService.inscrire(registerData).subscribe(
        (response) => {
          // Si l'inscription est réussie, redirection vers la page des produits
          if (response.success) {
            alert("Inscription réussie");
            this.router.navigate(['all-produit']);
          }
        },
        (error) => {
          // Affichage d'une alerte en cas d'erreur lors de l'inscription
          alert('Erreur lors de la requête inscription' + error);
        }
      );
    }
  }

  // Méthode pour le validateur personnalisé
  checkPasswords(g: FormGroup) {
    return g.get('password')?.value === g.get('confirm')?.value ? null : { mismatch: true };
  }
}
