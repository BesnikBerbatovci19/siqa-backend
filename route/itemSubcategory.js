const express = require("express");
const router = express.Router();

const ItemSubcategoryController = require("../controller/itemSubcategory.controller");
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
router.get("/getItemSubcategory", ItemSubcategoryController.getItemSubcategory);
router.get(
  "/getItemSubcategory/:id",
  ItemSubcategoryController.getItemSubcategoryById
);
router.post(
  "/createItemSubcategory",
  authMiddleware,
  checkRole("admin"),
  ItemSubcategoryController.createItemSubcategory
);

router.put(
  "/updateItemSubcategory/:id",
  authMiddleware,
  checkRole("admin"),
  ItemSubcategoryController.updateItemSubcategory
);

router.delete(
  "/deleteItemSubcategory/:id",
  authMiddleware,
  checkRole("admin"),
  ItemSubcategoryController.deleteItemSubcategory
);
module.exports = router;
