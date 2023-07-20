import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent implements OnInit{
  
  id!: string;
  produits: Produit[] = [];
  //Variable stockant la recherche effectué pour un produit
  recherche: string = '';
  produitTrouve: Produit | null = null;
  suggestions: Produit[] = [];
  tousLesProduits: Produit[] = [];
  //Variable contenant l'ID de la catégorie sélectionnée
  categorieSelectionnee: string | undefined = undefined;
  //Liste contenant l'ensemble des catégories disponibles
  liste_cate !: any[];
  produitsFiltres: any[] = []; // tableau pour stocker les produits filtrés

  constructor(private authService:AuthService, private router: Router, private produitService: ProduitService, private panierService: PanierService,private route: ActivatedRoute) { }
  ngOnInit() {
    //On store la liste des catégories
    this.produitService.getCategories().subscribe(
        (data: Produit[]) => {
          try{
            this.liste_cate = data;
          }
        catch(error) {
          console.error('Error fetching categories:', error);
        }
      }
      );
    //on récupère l'ID de la catégorie dans l'URL
    this.categorieSelectionnee = this.route.snapshot.params['cate'];
    //on store la liste des produits
    //si pas de catégorie sélectionnée alors on affiche tout les produits
    if (this.categorieSelectionnee === undefined){ this.AllProducts();}
    //sinon on affiche uniquement les produits désirés
    else{ this.filtrerCategorie(this.categorieSelectionnee);}

  }
  /*Fonction qui renvoie vers une autre page */
  redirectToPage(pageName : string) {
    /*Ce qu'il faut écrire dans pageName se trouve dans les paths de app-routing.module*/
    this.router.navigateByUrl(pageName);
  }
  //fonction qui renvoie la liste entière des produits
  AllProducts(){
    try{
      this.produitService.getProducts().subscribe(
        (data: Produit[]) => {
          this.produits = data;
          this.produitsFiltres = [...this.produits];
        }
      )
    }
      catch(error){
        console.error('Error fetching products:', error);
      }
  }
  //fonction qui renvoie la liste des produits dont la catégorie a été sélectionnée
  filtrerCategorie(id : string){
      try {
        this.produitService.getAllProduitOfCategorie(id).subscribe(
          (data: Produit[]) => {
            this.produits = data;
          }
        );
        this.router.navigateByUrl('all-produit/'+this.categorieSelectionnee);
      }
      catch(error){
        console.error('Error fetching All product from category :', error);
      }
  }

  logout(): void {
    // Appeler la méthode de déconnexion dans le service d'authentification
    this.authService.logout();
    // Rediriger vers la page de connexion
    this.router.navigate(['/all-produit']);
  }

  ouvrirPanier(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

  //
  getNombreProduitsPanier(): number {
    return this.panierService.getNombreProduitsPanier();
  }

  prixPanier(): number {
    return this.panierService.prixPanier();
  }

  rechercherProduit(): void {
    this.produitTrouve = this.produits.find(produit => produit.name.toLowerCase() === this.recherche.toLowerCase()) || null;
    if (this.produitTrouve === null) {
      alert('Produit non disponible');
    }
  }
  //affcihe initialment tous les produits avant la recherche
  afficherTousProduits : boolean = true;
  rechercherBouton(): void {
    this.afficherTousProduits = false;
    this.produitTrouve = null;
  
    if (this.categorieSelectionnee !== null) {
      // Filtrer les produits par catégorie
      this.produitsFiltres = this.produits.filter(produit => produit.categorieID === this.categorieSelectionnee && produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    } else {
      this.produitsFiltres = this.produits.filter(produit => produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    }
    
    
  
    const produitsTrouves = this.produitsFiltres.filter(produit => produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    if (produitsTrouves.length > 0) {
      this.produitTrouve = produitsTrouves[0]; // Sélectionnez le premier produit trouvé
    } else {
      alert('Aucun produit trouvé');
      this.recherche = ''; // Vide la barre de recherche
    }
    this.suggestions = []; // Réinitialise les suggestions après la recherche
  }
  afficherProduitTrouve(): void {
    const produitsTrouves = this.produits
      .filter(produit => produit.categorieID === this.categorieSelectionnee)
      .filter(produit => produit.name.toLowerCase().includes(this.recherche.toLowerCase()));
    if (produitsTrouves.length > 0) {
      this.produitTrouve = produitsTrouves[0]; // Sélectionnez le premier produit trouvé
    } else {
      alert('Aucun produit trouvé');
      this.recherche = ''; // Vide la barre de recherche
    }
  
    this.suggestions = []; // Réinitialise les suggestions après la recherche
  }

  //pour pouvoir confirmer une recherche en appuyant sur 'entrée'
  selectedSuggestionIndex: number = -1;
  onKeyDown(event: any): void {
    if (event.key === 'Enter') {
      if (this.selectedSuggestionIndex !== -1) {
        this.selectSuggestion(this.suggestions[this.selectedSuggestionIndex]);
      } else {
        this.rechercherBouton();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigSuggestion
        ('up');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigSuggestion
        ('down');
    } else {
      this.updateSuggestions();
    }
  }



  //appelée lorsqu'il y a une modification dans le champ de recherche 
updateSuggestions(): void {
  if (this.recherche.length >= 1) {
    if (this.categorieSelectionnee === null) {
      this.suggestions = this.produits.filter(produit =>
        produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
      );
    } else {
      this.suggestions = this.produits
        .filter(produit => produit.categorieID === this.categorieSelectionnee)
        .filter(produit =>
          produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
        );
    }
    if (this.suggestions.length === 1 && this.suggestions[0].name.toLowerCase() === this.recherche.toLowerCase()) {
      this.rechercherBouton();
    }
  } else {
    this.suggestions = [];
  }
}

  //appelée lorsque l'utilisateur clique sur l'une des suggestions affichées dans la liste
  selectSuggestion(suggestion: Produit): void {
    this.recherche = suggestion.name;
    this.suggestions = []; // réinitialise les suggestions quand que l'utilisateur a fait une sélection
    this.selectedSuggestionIndex = -1;
  }
  //pour rechercher des produits en fonction de la valeur saisie dans le champ de recherche 
  search(): void {
    if (this.recherche.length > 0) {
      this.suggestions = this.produits.filter(produit =>
        produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
      );
    } else {
      this.suggestions = [];
    }
  }

  //met à jour de l'index de la suggestion sélectionnée lors de la navigation avec les touches de direction
  navigSuggestion(direction: 'up' | 'down'): void {
    const suggestionsLength = this.suggestions.length;
    if (suggestionsLength === 0) return;
  
    if (direction === 'up') {
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex - 1 + suggestionsLength) % suggestionsLength;
    } else {
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex + 1) % suggestionsLength;
    }
  }

   //-------------toggle------------

  public afficherIcone: boolean = false;
  public afficherMenuIcone: boolean = false;

  public toggleReseau(): void {
    this.afficherIcone = !this.afficherIcone; //inverse la valeur
  }

  public toggleMenu(): void {
    this.afficherMenuIcone = !this.afficherMenuIcone;
  }

 //------------fin toggle------------

}