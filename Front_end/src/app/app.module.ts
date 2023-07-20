import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from "@ng-select/ng-select";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';


/* IMPORT DES COMPONENTS */
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { ProduitCompactComponent } from './components/produit-compact/produit-compact.component';
import { AllProduitComponent } from './components/all-produit/all-produit.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PanierComponent } from './components/panier/panier.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ModifierProfilComponent } from './components/modifier-profil/modifier-profil.component';
import { CommandesComponent } from './components/commandes/commandes.component';
import { ChatsComponent } from './components/chats/chats.component';
import { AdressesComponent } from './components/adresses/adresses.component';
import { ContactComponent } from './components/contact/contact.component';
import { RemboursementComponent } from './components/remboursement/remboursement.component';
import { VendeurComponent } from './components/vendeur/vendeur.component';
import { FavorisComponent } from './components/favoris/favoris.component';


@NgModule({
  declarations: [
    AppComponent,
    ProduitDetailComponent,
    ProduitCompactComponent,
    AllProduitComponent,
    InscriptionComponent,
    ConnexionComponent,
    AccueilComponent,
    PanierComponent,
    ProfilComponent,
    ModifierProfilComponent,
    CommandesComponent,
    ChatsComponent,
    AdressesComponent,
    ContactComponent,
    RemboursementComponent,
    VendeurComponent,
    FavorisComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }