const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware de protection
function auth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

/**
 * READ - Liste des produits
 */
router.get('/', auth, (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    res.render('products', { products: results });
  });
});

/**
 * CREATE - Formulaire
 */
router.get('/add', auth, (req, res) => {
  res.render('product_add');
});

/**
 * CREATE - Traitement
 */
router.post('/add', auth, (req, res) => {
  db.query(
    'INSERT INTO products (name) VALUES (?)',
    [req.body.name],
    () => res.redirect('/products')
  );
});

/**
 * UPDATE - Formulaire
 */
router.get('/edit/:id', auth, (req, res) => {
  db.query(
    'SELECT * FROM product WHERE id = ?',
    [req.params.id],
    (err, results) => {
      res.render('product_edit', { product: results[0] });
    }
  );
});

/**
 * UPDATE - Traitement
 */
router.post('/edit/:id', auth, (req, res) => {
  db.query(
    'UPDATE products SET name = ? WHERE id = ?',
    [req.body.name, req.params.id],
    () => res.redirect('/products')
  );
});

/**
 * DELETE
 */
router.get('/delete/:id', auth, (req, res) => {
  db.query(
    'DELETE FROM products WHERE id = ?',
    [req.params.id],
    () => res.redirect('/products')
  );
});

module.exports = router;
