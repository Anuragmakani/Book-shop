const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");

const { db } = require("../db/index.js");
const { generateAccessToken } = require("../middlewares/auth.middleware.js");

const createBuyer = asyncHandler(async (req, res) => {
  try {
    const { buyerName, email, role } = req.body;

    if ([buyerName, email, role].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Invalid request body");
    }

    if (role !== "buyer") {
      return res
        .status(400)
        .json(new ApiError(400, " only buyer allow to register"));
    }

    const existedBuyer = await db.Buyer.findOne({
      where: {
        email: email,
      },
    });

    if (existedBuyer) {
      return res
        .status(409)
        .json(new ApiError(409, "Buyer with email already exists"));
    }

    const reqBody = {
      buyerName: buyerName,
      email: email,
      role: role,
    };

    const buyer = await db.Buyer.create(reqBody);

    return res
      .status(201)
      .json(new ApiResponse(200, buyer, "registered Successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while creating the buyer");
  }
});

const buyerLogin = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    let buyer = await db.Buyer.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (!buyer) {
      return res.status(404).json(new ApiError(404, "buyer not found"));
      // throw new ApiError(404, "buyer not found");
    }

    const token = await generateAccessToken({
      buyerId: buyer.buyerId,
      email: buyer.email,
      role: buyer.role,
    });

    buyer["token"] = token;
    return res
      .status(200)
      .json(new ApiResponse(200, buyer, "logged in Successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while login");
  }
});

const getShops = asyncHandler(async (req, res) => {
  try {
    const shops = await db.Shop.findAll({
      include: {
        model: db.Seller,
        attributes: ["sellerName"],
      },
    });
    res.status(200).json(new ApiResponse(200, shops));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while shops");
  }
});

const viewShops = asyncHandler(async (req, res) => {
  console.log("======enter viewShops");
  try {
    const { shopName, sellerName } = req.query;
    console.log("=====shopName===", shopName);
    const shop = await db.Shop.findOne({
      where: {
        shopName: shopName,
      },
      include: {
        model: db.Seller,
        where: sellerName ? { sellerName: sellerName } : {},
        attributes: ["sellerName"],
      },
    });
    res.status(200).json(new ApiResponse(200, shop));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while shops");
  }
});

const getBooksInShop = asyncHandler(async (req, res) => {
  const shopId = req.params.shopId;
  try {
    const books = await db.Book.findAll({ where: { shopId: shopId } });
    res.status(200).json(new ApiResponse(200, books));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while getBooksInShop");
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const buyerId = req.buyer.buyerId;
  console.log("====buyerId===", buyerId);
  const { shopId, quantity, bookId } = req.body;
  try {
    const reqBody = {
      buyerId: buyerId,
      shopId: shopId,
      quantity: quantity,
      bookId: bookId,
    };
    const order = await db.Order.create(reqBody);
    res
      .status(201)
      .json(new ApiResponse(201, order, "order created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while createOrder"));
  }
});

const getBuyerOrders = async (req, res) => {
  try {
    console.log(req.buyer);
    const buyerId = req.buyer.buyerId;

    const orders = await db.Order.findAll({
      where: {
        buyerId: buyerId,
      },
      include: [
        {
          model: db.Shop,
          // attributes: [""],
        },
        {
          model: db.Book,
          // attributes: [""],
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBuyer,
  buyerLogin,
  viewShops,
  getShops,
  getBooksInShop,
  createOrder,
  getBuyerOrders,
};
