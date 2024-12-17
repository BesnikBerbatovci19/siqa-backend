const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product.controller");

router.get("/getProduct", ProductController.getProduct);
router.get("/getProductById/:id", ProductController.getProductById);
router.post("/createProduct", ProductController.createProduct);
router.delete("/deleteProduct/:id", ProductController.deleteProduct);
module.exports = router;
