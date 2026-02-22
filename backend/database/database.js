const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");
db.run("PRAGMA foreign_keys = ON");

/* Criar tabela para produtos */

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cod_bar TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    quantity INTEGER,
    category TEXT NOT NULL,
    expiration_date DATE,
    image BLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
});

/* Criar tabela para fornecedores */

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_enterprise TEXT NOT NULL,
    cnpj TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    main_contact TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

/* Criar tabela de relações produtos/fornecedores */

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products_suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      product_id INTEGER NOT NULL,
      supplier_id INTEGER NOT NULL,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      UNIQUE (product_id, supplier_id),

      FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

      FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `);
});

module.exports = db;
