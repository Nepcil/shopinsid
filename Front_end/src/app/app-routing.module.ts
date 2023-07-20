import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

/*Importer le chemin vers le component */
import { AllProduitComponent } from "./components/all-produit/all-produit.component";
import { ProduitDetailComponent } from "./components/produit-detail/produit-detail.component";
import { InscriptionComponent } from "./components/inscription/inscription.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { AccueilComponent } from './components/accueil/accueil.component';
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


const routes: Routes = [
  /* Lien vers un autre component destination
  /* path = nom de l'URL qui sera affiché dans la barre de recherche | Component = component source*/
  
  /* AU CHARGEMENT DU SITE RENVOI DIRECTEMENT A LA PAGE D ACCUEIL */
  { path: '', redirectTo: '/accueil',  pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent},
  { path: 'all-produit', component: AllProduitComponent},
  { path: 'all-produit/:cate', component: AllProduitComponent},
  { path: 'produit-detail/:iden', component: ProduitDetailComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuardService]},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuardService] },
  { path: 'modifier-profil', component: ModifierProfilComponent, canActivate: [AuthGuardService] },
  { path: 'commandes', component: CommandesComponent, canActivate: [AuthGuardService] },
  { path: 'chats', component: ChatsComponent, canActivate: [AuthGuardService] },
  { path: 'adresses', component: AdressesComponent, canActivate: [AuthGuardService] },
  { path: 'contact', component: ContactComponent },
  { path: 'remboursement', component: RemboursementComponent, canActivate: [AuthGuardService] },
  { path: 'vendeur', component: VendeurComponent, canActivate: [AuthGuardService] },
  { path: 'favoris', component: FavorisComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }