const express = require("express");
const router = express.Router();
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
const CategoryController = require("../controller/category.controller");

router.get("/getCategory", CategoryController.getCategory);
router.get("/getCategory/:id", CategoryController.getCategoryById);
router.post(
  "/createCategory",
  authMiddleware,
  checkRole("admin"),
  CategoryController.createCategory
);
router.put(
  "/updateCategory/:id",
  authMiddleware,
  checkRole("admin"),
  CategoryController.updateCategory
);
router.delete(
  "/deleteCategory/:id",
  authMiddleware,
  checkRole("admin"),
  CategoryController.deleteCategory
);
module.exports = router;
