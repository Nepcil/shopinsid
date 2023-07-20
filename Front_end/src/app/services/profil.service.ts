import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfilService {
    private profilUrl = 'http://127.0.0.1:8002/profil';

    constructor(
        private http: HttpClient,
        private authService: AuthService // Injecter le AuthService
    ) { }

    // Méthode pour obtenir les profils
    getProfils(): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken()); // Ajouter le token à l'en-tête
        return this.http.get<any>(this.profilUrl, { headers: headers }); // Inclure l'en-tête dans la requête
    }

    // Méthode pour modifier les profils
    modifierProfil(profil: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken()); // Ajouter le token à l'en-tête
        return this.http.put<any>(this.profilUrl, profil, { headers: headers }); // Inclure l'en-tête dans la requête
    }
}
