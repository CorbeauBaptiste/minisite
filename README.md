# MiniSite – Node.js / Express / MySQL

Mini site web développé avec **Node.js**, **Express**, **EJS** et **MySQL**.  
Il permet :
- une authentification simple par session
- la gestion (CRUD) des produits
- l’affichage des pages côté serveur (EJS)

---

## Technologies utilisées

- Node.js
- Express
- MySQL (mysql2)
- EJS
- express-session
- body-parser

---

## Description des routes

### Routes publiques

| Méthode | URL | Description |
|------|-----|-------------|
| GET | `/` | Page d’accueil |
| GET | `/login` | Formulaire de connexion |
| POST | `/login` | Traitement de la connexion |

---

### Routes protégées (authentification requise)

Toutes les routes ci-dessous nécessitent une session utilisateur active.

#### Produits

| Méthode | URL | Description |
|------|-----|-------------|
| GET | `/products` | Liste de tous les produits |
| GET | `/products/add` | Formulaire d’ajout d’un produit |
| POST | `/products/add` | Ajout d’un produit en base |
| GET | `/products/edit/:id` | Formulaire de modification |
| POST | `/products/edit/:id` | Mise à jour du produit |
| GET | `/products/delete/:id` | Suppression d’un produit |

---

### Sécurité des routes

Les routes protégées utilisent un middleware d’authentification :

```js
function auth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}
