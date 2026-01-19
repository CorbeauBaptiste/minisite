const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./db');
const productRoutes = require('./routes/products.routes');

const app = express();

// ===== CONFIG =====
app.set('view engine', 'ejs');

// ===== MIDDLEWARES =====
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// ===== ROUTES =====
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

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

// 👇 TOUJOURS APRÈS session
app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});
