import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remboursement',
  templateUrl: './remboursement.component.html',
  styleUrls: ['./remboursement.component.scss']
})
export class RemboursementComponent {
  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  constructor(
    private router: Router
  ) { }
}
