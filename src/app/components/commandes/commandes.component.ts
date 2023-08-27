import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})

export class CommandesComponent {
  // Méthode pour rediriger vers une autre page
  
  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  constructor(
    private router: Router
  ) { }
}