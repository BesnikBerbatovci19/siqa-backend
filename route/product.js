const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product.controller");
const uploadMiddleware = require("../middleware/upload/uploadMiddleware");
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
router.get(
  "/",
  authMiddleware,
  checkRole("admin"),
  ProductController.getProduct
);
router.get(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  ProductController.getProductById
);
router.post(
  "/",
  authMiddleware,
  checkRole("admin"),
  uploadMiddleware,
  ProductController.createProduct
);
router.put(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  uploadMiddleware,
  ProductController.updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  ProductController.deleteProduct
);

router.delete(
  "/deletePhotoProduct/:id/:idPhoto",
  authMiddleware,
  checkRole("admin", "user"),
  ProductController.deletePhoto
);

module.exports = router;
