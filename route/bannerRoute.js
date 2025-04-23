const express = require("express");
const router = express.Router();

const BannerController = require("../controller/banner.controller");
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
const uploadMiddlewareBanner = require("../middleware/upload/uploadMiddlewareBanner");

router.get("/", BannerController.getAllBanner);
router.post(
  "/",
  authMiddleware,
  checkRole("admin"),
  uploadMiddlewareBanner,
  BannerController.createBanner
);

router.delete(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  BannerController.deleteBanner
);
module.exports = router;
