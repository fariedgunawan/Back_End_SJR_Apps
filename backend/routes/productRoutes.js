const express = require("express");
const { addProduct, getBrandsAndCategories, getProducts } = require("../controllers/productController");
const router = express.Router();

router.post("/add", addProduct);
router.get("/products", getProducts);
router.get("/filters", getBrandsAndCategories);

module.exports = router;
