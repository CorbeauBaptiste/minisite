const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Page d'accueil
app.get('/', (req, res) => {
  res.render('home');
});

// Page login
app.get('/login', (req, res) => {
  res.render('login');
});

// Traitement login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (results.length > 0) {
        req.session.user = username;
        res.redirect('/products');
      } else {
        res.send('Identifiants incorrects');
      }
    }
  );
});

// Liste des produits
app.get('/products', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  db.query('SELECT * FROM products', (err, results) => {
    res.render('products', { products: results });
  });
});

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});
