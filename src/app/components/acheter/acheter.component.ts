import { Component } from '@angular/core';
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

interface CommandeInfo {
  id: string;
  priceLivraison: number;
  tva: number;
}

@Component({
  selector: 'app-acheter',
  templateUrl: './acheter.component.html',
  styleUrls: ['./acheter.component.scss']
})
export class AcheterComponent {

  produit: Produit | undefined;
  panierItems: PanierItem[] = [];
  tva: number = 20;
  livraison: number = 6;

  constructor(private panierService: PanierService) { }

  ngOnInit() {
    this.acheter();
  }

  getImagePath(image: string): string {
    return `assets/images-galerie/${image}`;
  }

  acheter() {
    // Logique de la commande
    if(this.panierItems != null){
      alert('Oups ! votre commande est vide');
    }else{
      this.livraison;
      this.tva = this.panierItems;
      alert('Merci pour votre achat');
    }
  }

}
