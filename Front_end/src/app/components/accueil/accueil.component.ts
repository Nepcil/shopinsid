import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit{  
  liste_cate!: any[];

    constructor(private router: Router, private produitService: ProduitService){ }
    /*Fonction qui renvoie vers une autre page */
    redirectToPage(pageName : string, id: string | null = null) {
      /*Ce qu'il faut écrire dans pageName se trouve dans les paths de app-routing.module*/
      if (id===null){this.router.navigate([`${pageName}`]);}
      else{this.router.navigate([`${pageName}`, id]);}
    }
  
    ngOnInit(){
      try{
        this.produitService.getCategories().subscribe(
          (data: Produit[]) => {
            this.liste_cate = data;
            console.log(this.liste_cate);
          }
        );
      }
      catch(error) {
          console.error('Error fetching categories:', error);
        }
      }
      
    }
