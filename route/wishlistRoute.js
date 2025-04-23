const express = require("express");
const router = express.Router();
const WishListController = require("../controller/wishlist.controller");
router.post("/", WishListController.createWishList);
router.get("/:biskoid", WishListController.getProductInWishList);
router.delete("/:biskoId/:productId", WishListController.deleteFromWishList);
module.exports = router;
