const db = require("../config/db");

const Product = {
  create: (name, brand, category, price, quantity, callback) => {
    const status = quantity > 0 ? "ready" : "sold";
    const query = "INSERT INTO products (name, brand, category, price, status, quantity) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [name, brand, category, price, status, quantity], callback);
  },

  findByNameCategoryBrand: (name, brand, category, callback) => {
    const query = "SELECT * FROM products WHERE name = ? AND brand = ? AND category = ?";
    db.query(query, [name, brand, category], callback);
  },

  updateQuantity: (id, newQuantity, callback) => {
    const query = "UPDATE products SET quantity = quantity + ?, status = IF(quantity > 0, 'ready', 'sold') WHERE id = ?";
    db.query(query, [newQuantity, id], callback);
  },
  
  getAll: (brand, category, callback) => {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (brand) {
      query += " AND brand = ?";
      params.push(brand);
    }

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    db.query(query, params, callback);
  },

  getAllBrandsAndCategories: (callback) => {
    const query = "SELECT DISTINCT brand, category FROM products";
    db.query(query, callback);
  },
};

module.exports = Product;
