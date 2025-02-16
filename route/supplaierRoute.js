const express = require("express");
const router = express.Router();

const SupplaierController = require("../controller/supplaier.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, SupplaierController.getSupplaier);
router.get("/:id", authMiddleware, SupplaierController.getSignelSupplaier);
router.post("/", authMiddleware, SupplaierController.createSupplaier);
router.put("/:id", authMiddleware, SupplaierController.updateSupplaier);
router.delete("/:id", authMiddleware, SupplaierController.deleteSupplaier);

module.exports = router;
