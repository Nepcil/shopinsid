import { ProfilData } from 'src/app/models/profil.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
    profils: ProfilData = {
        id: '',
        nom: '',
        prenom: '',
        tel: '',
        adresse: '',
        email: '',
        motdepasse: '',

    };

    constructor(
        private profilService: ProfilService,
        private router: Router
    ) { }

    // Lors de l'initialisation du composant, récupérer les profils
    ngOnInit() {
        this.getProfils();
    }

    // Méthode pour récupérer les profils à partir du service de profil
    getProfils() {
        this.profilService.getProfils().subscribe(
            (data: ProfilData) => {
                this.profils = data;
                console.log(this.profils); // Utilisez les données récupérées comme vous le souhaitez
            },
            (error) => {
                console.error('Erreur lors de la récupération des profils:', error);
            }
        );
    }

    // Méthode pour modifier un profil en utilisant le service de profil
    modifierProfil() {
        this.profilService.modifierProfil(this.profils).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    // Méthode pour rediriger vers une autre page
    redirectToPage(pageName: string) {
        this.router.navigate([`${pageName}`]);
    }

    // Méthode pour masquer le mot de passe
    maskPassword(password: string): string {
        const maskedChars = '*'.repeat(password.length);
        return maskedChars;
    }
}
