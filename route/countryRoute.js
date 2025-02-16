const express = require("express");
const router = express.Router();

const CountryController = require("../controller/country.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", CountryController.getCountry);
router.post("/", authMiddleware, CountryController.createCountry);
router.delete("/:id", authMiddleware, CountryController.deleteCountry);

module.exports = router;
