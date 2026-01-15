CREATE DATABASE minisite;
USE minisite;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

INSERT INTO users (username, password) VALUES ('admin', '1234');
INSERT INTO products (name) VALUES ('Produit A'), ('Produit B'), ('Produit C');
