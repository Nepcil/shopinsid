import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit-compact',
  templateUrl: './produit-compact.component.html',
  styleUrls: ['./produit-compact.component.scss']
})
export class ProduitCompactComponent implements OnInit {
  @Input() 
  
  produit!: Produit;
  id!: number;
  produits: Produit[] = [];
  selectedQuantity: number = 1;

  constructor(
    private router: Router,
    private produitService: ProduitService,
    private panierService: PanierService
    ) {}

  ngOnInit() {}

  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  getImagePath(imageUrl: string): string {
        return '../assets/img/'+this.produit.imageUrl;
    }

}