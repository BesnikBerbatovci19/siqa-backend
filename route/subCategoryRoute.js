const express = require("express");
const router = express.Router();

const SubcategoryController = require("../controller/subcategory.controller");
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
router.get("/getSubCategory", SubcategoryController.getSubCategory);
router.get("/getSubcategory/:id", SubcategoryController.getSubcategoryById);
router.post(
  "/createSubcategory",
  authMiddleware,
  checkRole("admin"),
  SubcategoryController.createSubcategory
);
router.put(
  "/updateSubcategory/:id",
  authMiddleware,
  checkRole("admin"),
  SubcategoryController.updateSubcategory
);
router.delete(
  "/deleteSubcategory/:id",
  authMiddleware,
  checkRole("admin"),
  SubcategoryController.deleteSubcategory
);

module.exports = router;
