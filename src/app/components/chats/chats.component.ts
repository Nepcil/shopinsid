import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})

export class ChatsComponent {
  // Méthode pour rediriger vers une autre page
  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  constructor(
    private router: Router
  ) { }
}