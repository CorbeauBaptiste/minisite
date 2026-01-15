const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'minisite_user',
  password: 'password123',
  database: 'minisite'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connecté à MySQL');
});

module.exports = db;
