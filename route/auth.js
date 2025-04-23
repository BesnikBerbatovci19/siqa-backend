const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const AuthController = require("../controller/auth.controller");
router.post("/login", AuthController.login);
router.get("/getUserByJwt", authMiddleware, AuthController.getUserByJwt);
module.exports = router;
