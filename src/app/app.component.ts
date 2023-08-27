import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from '@angular/compiler';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  produits: Produit[] = [];
  recherche: string = '';
  produitTrouve: Produit | null = null;
  tousLesProduits: Produit[] = [];
  categorieSelectionnee: string | undefined = undefined;
  liste_cate!: any[];
  produitsFiltres: any[] = [];
  isLoggedIn: boolean = false; 
  isAdmin: boolean = false; 
  public afficherIcone: boolean = false;
  public afficherMenuIcone: boolean = false;
  public nbProd: boolean = false;
  afficherTousProduits: boolean = true;
  selectedProduitsIndex: number = -1;

  constructor(
    private authService: AuthService,
    private router: Router,
    private produitService: ProduitService,
    private panierService: PanierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.produitService.getCategories().subscribe((data: Produit[]) => {
      try {
        this.liste_cate = data; // Stocke la liste des catégories
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    });
    this.categorieSelectionnee = this.route.snapshot.params['cate']; // Récupère l'ID de la catégorie dans l'URL

    if (this.categorieSelectionnee === undefined) {
      this.AllProducts(); // Affiche tous les produits si aucune catégorie n'est sélectionnée
    } else {
      this.filterCategorie(this.categorieSelectionnee); // Filtre les produits par catégorie
    }

    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();

  }
  

  //-----------------------------------------redirection page----------------------------------

  redirectToPage(pageName: string) {
    this.categorieSelectionnee = undefined; // Réinitialise la catégorie sélectionnée
    this.router.navigateByUrl(pageName);
  }

  //-----------------------------------------récupration de tous les produits----------------------------------

  AllProducts() {
    try {
      this.produitService.getProducts().subscribe((data: Produit[]) => {
        this.produits = data;
        this.produitsFiltres = [...this.produits];
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  }

  //----------------------------------------refreshPage-------------------------------------

  refreshPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  //-----------------------------------------filtrer par catégorie----------------------------------

  filterCategorie(categoryId: string): void {
    try {
      this.produitService.getAllProduitOfCategorie(categoryId).subscribe(
        (data: Produit[]) => {
      this.produits = data;
      });

      const selectedCategory = this.liste_cate.find(categorie => categorie.id === categoryId);
      const categoryName = selectedCategory ? selectedCategory.name : '';

      this.router.navigateByUrl('all-produit/' +  categoryId + '-' + selectedCategory.name);
      
        this.refreshPage();
      
  }catch(error){
    console.error('Erreur de recherche de categorie',error);
  }}

  //-----------------------------------------deconnexion retirer icons----------------------------------

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        console.log('Déconnexion réussie !');
        this.router.navigate(['connexion']); // Rediriger vers la page de connexion ou une autre page appropriée

          this.refreshPage();
        
      },
      (error) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    );
  }

  //-----------------------------------------panier----------------------------------

  ouvrirPanier(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

  getNombreProduitsPanier(): number {
    return this.panierService.getNombreProduitsPanier();
  }

  prixPanier(): number {
    return this.panierService.prixPanier();
  }

  //-----------------------------------------recherche produits------------------------------------

  rechercherProduit(): void {
    this.produitTrouve = this.produits.find(
        (produit) => produit.name.toLowerCase() === this.recherche.toLowerCase()
      ) || null;
    if (this.produitTrouve === null) {
      alert('Produit non disponible');
    }
  }

  rechercherBouton(): void {
    this.afficherTousProduits = false;
    this.produitTrouve = null;

    if (this.categorieSelectionnee !== null) {
      this.produitsFiltres = this.produits.filter(
        (produit) =>
          produit.categorieID === this.categorieSelectionnee &&
          produit.name.toLowerCase().includes(this.recherche.toLowerCase())
      );
    } else {
      this.produitsFiltres = this.produits.filter((produit) =>
        produit.name.toLowerCase().includes(this.recherche.toLowerCase())
      );
    }

    const produitsTrouves = this.produitsFiltres.filter((produit) =>
      produit.name.toLowerCase().includes(this.recherche.toLowerCase())
    );
    if (produitsTrouves.length > 0) {
      this.produitTrouve = produitsTrouves[0];
    } else {
      alert('Aucun produit trouvé');
      this.recherche = '';
    }
    this.produits = [];
  }

  afficherProduitTrouve(): void {
    const produitsTrouves = this.produits
      .filter((produit) => produit.categorieID === this.categorieSelectionnee)
      .filter((produit) =>
        produit.name.toLowerCase().includes(this.recherche.toLowerCase())
      );
    if (produitsTrouves.length > 0) {
      this.produitTrouve = produitsTrouves[0];
    } else {
      alert('Aucun produit trouvé');
      this.recherche = '';
    }

    this.produits = [];
  }


  onKeyDown(event: any): void {
    if (event.key === 'Enter') {
      if (this.selectedProduitsIndex !== -1) {
        this.selectProduits(this.produits[this.selectedProduitsIndex]);
      } else {
        this.rechercherBouton();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigProduits('up');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigProduits('down');
    } else {
      this.updateProduits();
    }
  }

  updateProduits(): void {
    if (this.recherche.length >= 1) {
      if (this.categorieSelectionnee === null) {
        this.produits = this.produits.filter((produit) =>
          produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
        );
      } else {
        this.produits = this.produits
          .filter(
            (produit) => produit.categorieID === this.categorieSelectionnee
          )
          .filter((produit) =>
            produit.name.toLowerCase().startsWith(this.recherche.toLowerCase())
          );
      }
      if (
        this.produits.length === 1 &&
        this.produits[0].name.toLowerCase() === this.recherche.toLowerCase()
      ) {
        this.rechercherBouton();
      }
    } else {
      this.produits = [];
    }
  }

  selectProduits(Produits: Produit): void {
    this.recherche = Produits.name;
    this.produits = [];
    this.selectedProduitsIndex = -1;
  }

  navigProduits(direction: 'up' | 'down'): void {
    if (this.produits.length === 0) {
      return;
    }

    if (direction === 'up') {
      if (this.selectedProduitsIndex === -1) {
        this.selectedProduitsIndex = this.produits.length - 1;
      } else {
        this.selectedProduitsIndex =
          (this.selectedProduitsIndex - 1 + this.produits.length) %
          this.produits.length;
      }
    } else {
      this.selectedProduitsIndex =
        (this.selectedProduitsIndex + 1) % this.produits.length;
    }

    this.recherche = this.produits[this.selectedProduitsIndex].name;
  }

  //-----------------------------------------afficher ou masquer bouton----------------------------------

  public toggleReseau(): void {
    this.afficherIcone = !this.afficherIcone; //afficher ou inverse la valeur
  }

  public toggleMenu(): void {
    this.afficherMenuIcone = !this.afficherMenuIcone;
  }

  public countPanier() {
    if (this.getNombreProduitsPanier() >= 1) {
      this.nbProd = true;
      this.getNombreProduitsPanier();
    } else {
      this.nbProd = false;
    }
  }
  
}
