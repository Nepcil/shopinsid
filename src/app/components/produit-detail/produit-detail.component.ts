import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss'],
})
export class ProduitDetailComponent implements OnInit {
  id!: number;
  produit: Produit | undefined;
  produits: Produit[] = [];
  selectedQuantity: number = 1;
  public btopen: boolean = false;
  public galerie: boolean = false;
  public video: boolean = false;
  public socialNetwork: boolean = false;
  public sendComment: boolean = false;
  public handMore: boolean = false;
  public favoris: boolean = false;
  public handLess: boolean = false;
  public pourcent: number = 0;
  public starEmpty: boolean = true;
  public starHalf: boolean = false;
  public starFull: boolean = false;
  public currentIndex: number = 0;
  public translateOffset: number = 0;
  slides: string[] = ['dance.jpg', 'expo.jpg', 'grenouille.jpg', 'photographeuse.jpg', 'tigre.jpg'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private panierService: PanierService
  ) {}

  ngOnInit() {
    // on récupère l'id du produit
    this.id = +this.route.snapshot.params['iden'];

    this.produitService.getProducts().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        this.produit = this.produits.find((item) => item.id === this.id);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  redirectToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  ajouterAuPanier() {
    if (this.produit) {
      this.panierService
        .ajouterAuPanier(this.produit, this.selectedQuantity)
        .subscribe(
          () => {
            alert('Produit ajouté au panier avec succès');
          },
          (error) => {
            console.error("Erreur lors de l'ajout au panier :", error);
          }
        );
    }
  }

  changePrixQuantite(): number {
    if (this.produit) {
      let prix = this.produit.price * this.selectedQuantity;
      return parseFloat(prix.toFixed(2));
    }
    return 0;
  }

  getImagePath(imageUrl: string): string {
    return '../assets/img/' + imageUrl;
  }

  //------------------toggle---------

  public close(): void {
    this.btopen = false;
    this.galerie = false;
    this.video = false;
    this.sendComment = false;
    this.socialNetwork = false;
  }

  public toggleGalerie(): void {
    this.btopen = true;
    this.galerie = !this.galerie;
  }

  public toggleVideo(): void {
    this.btopen = true;
    this.video = !this.video;
  }

  public toggleSocial(): void {
    this.btopen = true;
    this.socialNetwork = !this.socialNetwork;
  }

  public toggleComment(): void {
    this.btopen = true;
    this.sendComment = !this.sendComment;
  }

  public toggleHandMore(): void {
    if ((this.handMore = !this.handMore)) {
      this.handLess = false;
    }
  }

  public toggleHandLess(): void {
    if ((this.handLess = !this.handLess)) {
      this.handMore = false;
    }
  }

  public nivel(): void {
    this.pourcent < 100;

    if (this.pourcent < 50) {
      this.starEmpty = true;
      this.starFull = false;
      this.starHalf = false;
    }
    if (this.pourcent === 50) {
      this.starHalf = true;
      this.starEmpty = false;
      this.starFull = false;
    }
    if (this.pourcent > 50) {
      this.starFull = true;
      this.starEmpty = false;
      this.starHalf = false;
    }
  }

  public toggleFavoris(): void {
    this.favoris = !this.favoris;
  }

  //------------------popup----------------

  gauche() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }
  
  droite() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlider();
  }

  updateSlider() {
    const offset = -this.currentIndex * 20;
    const sliderContent = document.querySelector('.imgCadre') as HTMLElement;
    sliderContent.style.transform = `translateX(${offset}%)`;
  }

  getImage(image: string): string {
    return `assets/images-galerie/${image}`;
  }
  
}
