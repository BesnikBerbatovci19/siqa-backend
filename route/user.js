const express = require("express");
const router = express.Router();
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
const UserController = require("../controller/user.controller");
router.get(
  "/getUser",
  authMiddleware,
  checkRole("admin"),
  UserController.getUser
);
router.get(
  "/getUser/:id",
  authMiddleware,
  checkRole("admin"),
  UserController.getUserById
);
router.post(
  "/updateUser",
  authMiddleware,
  checkRole("guest"),
  UserController.updateGuestUser
);
router.post("/createUser", UserController.createUser);
router.put(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  UserController.updateUser
);
router.delete(
  "/delete/:id",
  authMiddleware,
  checkRole("admin"),
  UserController.deleteUser
);

module.exports = router;
