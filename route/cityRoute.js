const express = require("express");
const router = express.Router();
const CityController = require("../controller/city.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", CityController.getCities);
router.get("/:id", authMiddleware, CityController.getCityById);
router.post("/", authMiddleware, CityController.createCity);
router.delete("/:id", authMiddleware, CityController.deleteCity);

module.exports = router;
