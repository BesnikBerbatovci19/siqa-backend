const express = require("express");
const router = express.Router();

const ManufacterController = require("../controller/manufacter.controller");
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
router.get("/getManufacter", ManufacterController.getAllManufacter);
router.post(
  "/createManufacter",
  authMiddleware,
  checkRole("admin"),
  ManufacterController.createManufacter
);
router.delete(
  "/deleteManufacter/:id",
  authMiddleware,
  checkRole("admin"),
  ManufacterController.deleteManufacter
);
module.exports = router;
