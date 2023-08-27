import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
    private authService: AuthService, 
    private location: Location,
    private router: Router
    ) { }

    canActivate(): boolean {
        const currentUrl = this.location.path();
        
        if (currentUrl.includes('/vendeur')) {
            if (!this.authService.hasRole('ROLE_ADMIN') || this.authService.hasRole('')) {
                this.router.navigate(['inscription']); // Rediriger ailleurs
                return false;
            }else {
                return true;
            }
        }

        if (
            currentUrl.includes('/commandes') ||
            currentUrl.includes('/adresses') ||
            currentUrl.includes('/modifier-profil') ||
            currentUrl.includes('/chats') ||
            currentUrl.includes('/remboursement') ||
            currentUrl.includes('/profil') ||
            currentUrl.includes('/acheter')
        ) {
            if (this.authService.isLoggedIn()) {
                return true;
            } else {
                this.router.navigate(['connexion']);
                return false;
            }
        }

        return true; // Laisser passer les autres pages
    }
    
    PageGuard(): void {
        this.location.replaceState('/connexion'); // Rediriger vers la page de connexion
    
        setTimeout(() => {
        window.location.reload();
        }, 100);
    }
    

}
