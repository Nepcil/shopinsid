import { ModifierProfilData } from 'src/app/models/modifier-profil.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.scss']
})


export class AdressesComponent implements OnInit {
  profils = this.formBuilder.group({
    id: '',
    nom: '',
    prenom: '',
    tel: '',
    adresse: '',
    email: '',
    motdepasse: ''
  });

  constructor(
    private profilService: ProfilService,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  // Lors de l'initialisation du composant, récupérer les profils
  ngOnInit() {
    this.getProfils();
  }

  // Méthode pour récupérer les profils à partir du service de profil en rajoutant FormBuilder.group
  getProfils() {
    this.profilService.getProfils().subscribe(
      (data: ModifierProfilData) => {
        this.profils = this.formBuilder.group({
          id: data.id,
          nom: data.nom,
          prenom: data.prenom,
          tel: data.tel,
          adresse: data.adresse,
          email: data.email,
          motdepasse: ''

        });
        console.log(this.profils); // Utilisez les données récupérées comme vous le souhaitez
      },
      (error) => {
        console.error('Erreur lors de la récupération des profils:', error);
      }
    );
  }



  // Méthode pour rediriger vers une autre page
  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}