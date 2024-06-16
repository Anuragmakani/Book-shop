const express = require("express");
const router = express.Router();

const {
  sellerRegistration,
  sellerLogin,
  sellerCreateShop,
  sellerCreateBook,
  getBooks,
  getSellerOrders,
  sellerMultipleCreateShop

} = require("../controllers/seller.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");


// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/seller/register").post(sellerRegistration);
router.route("/seller/login").post(sellerLogin);
router.route("/seller/one/create-shop").post(verifyJWT,sellerCreateShop);
router.route("/seller/create-book").post(verifyJWT,sellerCreateBook);
router.route("/seller/get-books/:sellerId").get(verifyJWT,getBooks);
router.route("/seller/get-oreders").get(verifyJWT,getSellerOrders);

// extra
router.route("/seller/multiple/create-shop").post(verifyJWT,sellerMultipleCreateShop)


module.exports = router;
