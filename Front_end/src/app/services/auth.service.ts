import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private connexionUrl = 'http://127.0.0.1:8002/login';
  private inscriptionUrl = 'http://127.0.0.1:8002/register';
  private logoutUrl = 'http://127.0.0.1:8002/logout';

  private readonly TOKEN_KEY = 'userToken';

  constructor(private http: HttpClient) { }

  // Méthode pour s'inscrire
  inscrire(name: string, password: string, birthdate: Date, email: string, tel: number, adresse: string, languePreferee: string): Observable<any> {
    return this.http.post<any>(this.inscriptionUrl, { name, password, birthdate, email, tel, adresse, languePreferee });
  }

  // Méthode pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.connexionUrl, { email, password }).pipe(
      tap((response) => {
        // Stocker le token dans le sessionStorage
        sessionStorage.setItem(this.TOKEN_KEY, response.token);
      })
    );
  }

  // Méthode pour se déconnecter
  logout(): void {
    this.http.post<any>(this.logoutUrl, { token: sessionStorage.getItem(this.TOKEN_KEY) }).subscribe(
      () => {
        // Supprimer le token du sessionStorage
        sessionStorage.removeItem(this.TOKEN_KEY);
        alert("Vous venez de vous déconnecter !");
      },
      (error) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    );
  }

  // Méthode pour obtenir le token stocké
  getToken(): string {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    if (token) {
      return token;
    } else {
      return "";
    }
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
