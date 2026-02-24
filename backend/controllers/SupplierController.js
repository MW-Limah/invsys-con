const db = require("../database/database");

const SupplierController = {
  index(req, res) {
    try {
      const rows = db.prepare("SELECT * FROM suppliers").all();
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  show(req, res) {
    try {
      const { id } = req.params;
      const row = db.prepare("SELECT * FROM suppliers WHERE id = ?").get(id);
      if (!row) return res.status(404).json({ message: "Fornecedor não encontrado." });
      res.json(row);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  store(req, res) {
    try {
      const { name_enterprise, cnpj, address, phone, email, main_contact } = req.body;
      const sql = `INSERT INTO suppliers (name_enterprise, cnpj, address, phone, email, main_contact)
            VALUES (?,?,?,?,?,?)`;
      const result = db.prepare(sql).run(name_enterprise, cnpj, address, phone, email, main_contact);
      res.status(201).json({ id: result.lastInsertRowid });
    } catch (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({
          message: "Fornecedor com este CNPJ já está cadastrado!",
        });
      }
      res.status(400).json({ error: err.message });
    }
  },

  update(req, res) {
    try {
      const { id } = req.params;
      const { name_enterprise, cnpj, address, phone, email, main_contact } = req.body;
      const sql = `UPDATE suppliers SET name_enterprise=?, cnpj=?, address=?, phone=?, email=?, main_contact=? WHERE id=?`;
      db.prepare(sql).run(name_enterprise, cnpj, address, phone, email, main_contact, id);
      res.status(201).json({ message: "Fornecedor atualizado com sucesso!" });
    } catch (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({
          message: "Não foi possível atualizar. Este CNPJ já está cadastrado.",
        });
      }
      res.status(500).json({ error: err.message });
    }
  },

  destroy(req, res) {
    try {
      const { id } = req.params;
      const result = db.prepare("DELETE FROM suppliers WHERE id = ?").run(id);
      if (result.changes === 0) {
        return res.status(404).json({ message: "Fornecedor não encontrado." });
      }
      res.json({ message: "Fornecedor removido com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = SupplierController;
