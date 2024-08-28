const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");

const addProduct = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    if (decoded.role !== "operator") {
      return res.status(403).json({ message: "Permission denied: Only operators can add products" });
    }

    const { name, brand, category, price, quantity } = req.body;

    Product.findByNameCategoryBrand(name, brand, category, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        // Jika produk dengan nama, brand, dan kategori yang sama sudah ada, tambahkan kuantitas
        const product = results[0];
        Product.updateQuantity(product.id, quantity, (err, updateResults) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Quantity updated successfully!" });
        });
      } else {
        // Jika produk belum ada, tambahkan produk baru
        Product.create(name, brand, category, price, quantity, (err, createResults) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: "Product added successfully!" });
        });
      }
    });
  });
};

const getProducts = (req, res) => {
  const { brand, category } = req.query;

  Product.getAll(brand, category, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getBrandsAndCategories = (req, res) => {
  Product.getAllBrandsAndCategories((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { addProduct, getProducts, getBrandsAndCategories };
