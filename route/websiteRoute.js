const exporess = require("express");
const router = exporess.Router();
const WebsiteController = require("../controller/website.controller");

const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
const uploadMiddlewareWebsite = require("../middleware/upload/uploadMiddlewareWebsite");
router.get("/", WebsiteController.getAllWebsite);
router.post(
  "/",
  authMiddleware,
  checkRole("admin"),
  uploadMiddlewareWebsite,
  WebsiteController.createWebsite
);
router.delete(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  WebsiteController.deleteWebsite
);
module.exports = router;
