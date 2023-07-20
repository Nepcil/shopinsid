import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

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

  constructor(private panierService: PanierService) { }

  ngOnInit() {
    this.getPanierItems();
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
    // Logique de la commande
    if(!this.panierItems){
      alert('Oups votre panier est vide, auriez-vous oublié de commander ?');
    }else{
      alert('Commande passée avec succès');
    }
  }

}
