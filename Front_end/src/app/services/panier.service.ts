import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { ProduitPanier } from '../models/produitPanier.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'http://127.0.0.1:8002/'; // Remplacez par l'URL de votre API
  panierItems: ProduitPanier[] = []; //Ajouter avec //

  constructor(private http: HttpClient) { }

  ajouterAuPanier(produit: Produit, quantite: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/panier/add`, { 'id': produit.id, quantite });
  }

  supprimerDuPanier(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/panier/delete/${id}`);
  }

  getProduitsPanier(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/panier`);
  }

  //
  produitDansPanier(produit: Produit): boolean {
    return this.panierItems.some(item => item.produit.id === produit.id);
  }

  getNombreProduitsPanier(): number {
    return this.panierItems.length;
  }

  prixPanier(): number {
    let total = 0;

    for (const item of this.panierItems) {
      total += item.produit.price * item.quantite;
    }

    return parseFloat(total.toFixed(2));
  }




}
