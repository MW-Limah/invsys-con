const db = require("../database/database");
const fs = require("fs");
const path = require("path");

const ProductController = {
  index(req, res) {
    try {
      const rows = db.prepare("SELECT * FROM products").all();
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  show(req, res) {
    try {
      const { id } = req.params;
      const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
      if (!row) return res.status(404).json({ message: "Produto não encontrado" });
      res.json(row);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  store(req, res) {
    try {
      const { name, cod_bar, description, quantity, category, expiration_date, price } = req.body;
      const image = req.file ? req.file.filename : null;

      const sql = `INSERT INTO products 
      (name, cod_bar, description, quantity, category, expiration_date, image, price) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const result = db.prepare(sql).run(name, cod_bar, description, quantity, category, expiration_date, image, price);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({
          message: "Produto com este código de barras já está cadastrado!",
        });
      }
      res.status(400).json({ error: err.message });
    }
  },

  update(req, res) {
    try {
      const { id } = req.params;
      const { name, cod_bar, description, quantity, category, expiration_date, price, image: bodyImage } = req.body;

      let finalImage = req.file ? req.file.filename : bodyImage;

      const sql = `UPDATE products SET 
      name=?, cod_bar=?, description=?, quantity=?, category=?, expiration_date=?, image=?, price=? 
      WHERE id=?`;

      db.prepare(sql).run(name, cod_bar, description, quantity, category, expiration_date, finalImage, price, id);

      res.json({ message: "Produto atualizado com sucesso!" });
    } catch (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({
          message: "Não foi possível atualizar. Este Código de barras já pertence a outro produto.",
        });
      }
      res.status(500).json({ error: err.message });
    }
  },

  destroy(req, res) {
    try {
      const { id } = req.params;

      const row = db.prepare("SELECT image FROM products WHERE id = ?").get(id);
      if (row && row.image) {
        const filePath = path.join(__dirname, "..", "uploads", row.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      const result = db.prepare("DELETE FROM products WHERE id = ?").run(id);
      if (result.changes === 0) return res.status(404).json({ message: "Produto não encontrado" });
      res.json({ message: "Produto deletado com sucesso", id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ProductController;
