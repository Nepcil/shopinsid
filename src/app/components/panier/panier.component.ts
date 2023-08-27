import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { Produit } from 'src/app/models/produit.model';

interface PanierItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantite: number;
}


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  panierItems: PanierItem[] = [];
  produit: Produit | undefined;

  constructor(
    private panierService: PanierService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getPanierItems();
  }

  getImagePath(image: string): string {
    return `assets/images-galerie/${image}`;
  }

  private getPanierItems() {
    this.panierService.getProduitsPanier().subscribe(items => {
      this.panierItems = items;
    });
  }

  supprimerDuPanier(id: string) {
    this.panierService.supprimerDuPanier(id.toString()).subscribe(() => {
      this.getPanierItems();
      alert('Produit supprimé du panier avec succès');
    });
  }

  commander() {
    if(this.panierItems != null){
      this.redirectToPage('acheter');
      this.refreshPage();
      alert('Bienvenue à la page de commande');
    } else {
      alert('Oups ! votre panier est vide');
    }
  }
  
  redirectToPage(pageName: string) {
  this.router.navigate([`${pageName}`]);
  }

  refreshPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  
}
