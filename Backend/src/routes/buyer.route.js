const express = require("express");
const router = express.Router();

const {
    createBuyer,
    getShops,
    getBooksInShop,
    createOrder,
    getBuyerOrders,
    buyerLogin,
    viewShops
} = require("../controllers/buyer.controller");
const { verifyJWT } = require("../middlewares/auth.middleware.js");


// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/buyer/register").post(createBuyer);
router.route("/buyer/login").post(buyerLogin);
router.route("/buyer/shop").get(verifyJWT,getShops);
router.route("/buyer/book-shop/:shopId").get(verifyJWT,getBooksInShop);
router.route("/buyer/create-order").post(verifyJWT,createOrder);
router.route("/buyer/get-orders").get(verifyJWT,getBuyerOrders);
router.route("/buyer/view-shop").get(verifyJWT,viewShops);


module.exports = router;
