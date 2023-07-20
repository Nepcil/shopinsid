# **FRONT_END**

<br />

## **DOCUMENTATION**

> **``@Component``** : décorateur définissant les caractéristiques du composant.

> **``selector``** : nom de la balise HTML qui représente le composant.

> **``templateUrl``** : fichier HTML associé au composant.

> **``styleUrls``** : fichier SCSS associé au composant.

> **`ng g c component-name`** : commande pour créer un nouveau component.

> **``ngOnInit()``** : fonction angular qui est appelée à la construction d'une instance de classe.

> **``@Input()``** : token angular qui permet d'utiliser des variables d'un component parent à ses components enfants.

> **``*ngFor``** : fonction angular (utilisée dans le html) qui parcourt les éléments d'une liste.

> **``router.navigate()``** : fonction qui redirige vers une autre page passée en argument. Cet argument doit être un path dans *app-routing.module*.

> **``*ngIf``** : fonction angular (utilisée dans le html) qui vérifie si la condition est vraie.

> **``<balise class="nom_de_la_classe">``** : associe un style défini dans la classe passée en argument écrite dans le fichier scss.

> **``http.get(json.file).subscribe()``** : fonction qui permet de récupérer les données depuis un fichier json passé en argument. Nécessité d'importer **``httpClient``** !

> **``<form>``** : est une balise HTML qui permet de créer des formulaires interactifs.

> **``<input>``** : est une balise HTML qui créer un champs de saisie, on peut préciser le type de champs (text, password, email, date, number, file, submit, reset, ...).

> **``<label>``** : est une balise HTML qui permet d'étiquetter un élément d'un formulaire.

> **``<nav>``** : balise HTML provenant du module bootstrap, est un préfabriqué pour une barre de navigation.

> **``navbar-brand``** : classe CSS de bootstrap qui représente un titre dans une barre de navigation.

> **``<ng-Select>``** : balise HTML angular servant à créer un menu déroulant.

> **`<select class="form-select">`** : balise HTML servant à créer un menu déroulant.

> **`<select [(ngModel)]="nom_variable">`** : affecte le changement d'état d'un menu déroulant à la variable.

> **`<option value="">`** : créer une option dans un menu déroulant en lui associant une valeur spécifique.

> **``navbar-nav ml-auto``** : classe CSS de bootstrap qui aligne les éléments de la barre de navigation à droite de l'écran.

<br /><br />

## **FONCTIONNALITÉS**

> **Composant : All-produit** <br/>
Composant contenant la liste des produits et appelle ``app-produit-compact`` pour afficher chaque produit, et mode compact. Affiche uniquement en colonne et pas en ligne. Le filtrage des produits par catégorie fonctionne correctement lorsque l'on change de catégories depuis la page ou depuis l'accueil. Cependant, l'URL affiche l'ID de la catégorie plutôt que le nom.

> **Composant : Produit-compact** <br />
Composant affichant les résumés du produit et ajoute un bouton cliquable "Détails" qui redirige vers une page ``produit-detail`` avec un identifiant.

> **Composant : Produit-detail** <br />
Composant affichant, selon l'identifiant reçu, le bon produit en détails (nom, image, prix, description). Possibilité de retour en arrière avec le bouton cliquable "Retour".

> **Composant : Accueil** <br />
Composant affichant la page d'accueil lorsque l'on arrive sur le site. Possibilité de cliquer sur les boutons ``s'inscrire`` et de ``se connecter`` qui redirigent vers la page d'inscription ou de connexion. Choix de la catégorie disponible et redirection vers la page de produits de la catégorie correspondante.

> **Composant : Inscription** <br />
Composant servant à recruter des informations de l'utilisateur pour y inscrire un nouveau compte sur le site. Les vérifications sur les champs de saisies sont opérationnelles et l'inscription s'effectue correctement vers la base de données. Présentation de la page améliorée avec une banderole et des champs obligatoires.

> **Composant : Connexion** <br />
Composant servant à se connecter à un compte déjà existant. La requête est bien réceptionnée par la base de données et la connexion fonctionne correctement. Présentation de la page améliorée avec une banderole.

> **Composant : Panier** <br/>
Composant affichant le résumé de la liste de produits à acheter par l'utilisateur.

> **Composant : Profil** <br />
A compléter...

<br /><br />

## **PROBLEMES DETECTES**

    . Les catégoriesID ne correspondent pas aux produitsID. Le filtrage par catégorie est donc altéré.

## **PROBLEMES RESOLUS**

    . Les mêmes produits apparaissent 2 fois lorsque l'on revient sur la page des produits. | (Suppression de la balise <app-all-produit> dans le fichier "app.component.html").

    . Les données lors d'une connexion ne sont pas chiffrées dans l'URL de la page.

    . Les données saisies ne sont pas récupérées lors de l'inscription (champs constamment vides) | (Ajout d'une option dans la balise form).

    . Connexion impossible à la base de données pour des raisons de sécurité. ( Requête refusée ). | (Changement des liens https vers la BDD par http).


<br />

## **SE DIRIGER DANS LE PROJET**


    . Front_end                 #racine du projet
        .src                    #dossier contenant les sources du site.
            .app                #dossier contenant tous les blocs de codes (TS et HTML)
                .components     #dossier contenant tous les composants

                    *À chaque composant est associé trois fichiers*
                    . HTML      #pour l'aperçu
                    . TS        #pour le code
                    . SCSS      #pour le style

            .assets                     #dossier contenant les images
                . list-product.json     #fichier json servant de Base de données

            .index.html         #fichier qui gère l'aperçu général du site.

<br />

## **INSTALLATIONS NECESSAIRES**

> Angular client : **``npm install -g @angular/cli``**

> Installer les node modules (dans la racine du projet *ANGULAR*) : **``npm install``**

> Installer les modules annexes : <br>
    - **bootstrap : ``npm install bootstrap``** <br />
    - **crypto-js : ``npm install crypto-js``** <br />
    - **jquery : ``npm install jquery``** <br />
    - **ngSelect : ``npm install --save @ng-select/ng-select``**

> Vérifiez que les trois premiers modules annexes sont bien importés de la manière suivante dans le fichier **angular.json** :
```json
...
"build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
    "outputPath": "dist/shopinsid",
    "allowedCommonJsDependencies": [
        "crypto-js"                                         //crypto-js here
    ],
    "index": "src/index.html",
    "main": "src/main.ts",
    "polyfills": [
        "zone.js"
    ],
    "tsConfig": "tsconfig.app.json",
    "inlineStyleLanguage": "scss",
    "assets": [
        "src/favicon.ico",
        "src/assets"
    ],
    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "src/styles.scss"
    ],
    "scripts": [
        "node_modules/jquery/dist/jquery.min.js",           // jquery here
        "node_modules/bootstrap/dist/js/bootstrap.min.js"   //bootstrap here
    ]
    },
    ...
```
> Vérifiez que le dernier module annexe est bien importé dans le fichier **app.module.ts**
```ts
import { NgSelectModule } from "@ng-select/ng-select";
```
<br />

## **EXECUTER LE PROJET ANGULAR**

Ouvrez un terminal à la racine du **projet angular** et tappez la commande suivante :
**`ng serve`**.

<br />

## **METTRE A JOUR SON DEPOT GIT**

Voici la liste des commandes git importantes pour le projet :
> **`git pull`** : met à jour le dépôt.

> **`git add .`** : Ajoute toutes les modifications apportées.

> **`git commit -m "<message>"`** : Apporte un commentaire sur les modifications effectuées.

> **`git push`** : Met à jour votre dépot avec les modifications apportées localement.

> **`git status`** : Consulte l'état de votre dépôt git.

> **`git log`** : Consulte l'historique des commits.

> **`git checkout <branche>`** : change de branche.