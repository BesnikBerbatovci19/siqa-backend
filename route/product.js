const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product.controller");
const uploadMiddleware = require("../middleware/upload/uploadMiddleware");

router.get("/getProduct", ProductController.getProduct);
router.get("/getProduct/:id", ProductController.getProductById);
router.post(
  "/createProduct",
  uploadMiddleware,
  ProductController.createProduct
);
router.put("/updateProduct/:id", ProductController.updateProduct);
router.delete("/deleteProduct/:id", ProductController.deleteProduct);
module.exports = router;
