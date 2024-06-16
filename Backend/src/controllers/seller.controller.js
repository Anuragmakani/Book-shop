const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { db } = require("../db/index.js");
const { QueryTypes, Op } = require("sequelize");
const { generateAccessToken } = require("../middlewares/auth.middleware.js");
const e = require("express");

const sellerRegistration = asyncHandler(async (req, res) => {
  try {
    const { sellerName, email, role } = req.body;

    if ([sellerName, email].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Invalid request body");
    }

    const existedSeller = await db.Seller.findOne({
      where: {
        email: email,
      },
    });

    if (existedSeller) {
      return res
        .status(409)
        .json(new ApiError(409, "seller with this email already exists"));
    }

    const reqBody = {
      sellerName: sellerName,
      email: email,
      role: role,
    };

    const seller = await db.Seller.create(reqBody);

    return res
      .status(201)
      .json(new ApiResponse(201, seller, "register successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while registering");
  }
});

const sellerLogin = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    let seller = await db.Seller.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (!seller) {
      return res.status(404).json(new ApiError(404, "seller not found"));
    }

    const token = await generateAccessToken({
      sellerId: seller.sellerId,
      email: seller.email,
      role: seller.role,
    });

    seller["token"] = token;
    return res
      .status(200)
      .json(new ApiResponse(200, seller, "logged in Successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while login");
  }
});

const sellerCreateShop = asyncHandler(async (req, res) => {
  try {
    const { shopName } = req.body;
    const sellerId = req.seller.sellerId;
    const reqBody = {
      shopName: shopName,
      sellerId,
    };

    const isExistsShop = await db.Shop.findOne({
      where: {
        sellerId,
      },
    });

    if (isExistsShop) {
      return res
        .status(409)
        .json(new ApiError(409, "Seller can create only one shop"));
    }

    const createShop = await db.Shop.create(reqBody);

    if (!createShop) {
      return res.status(404).json(new ApiError(404, "unable to create shop"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, createShop, "shop created successfully"));
  } catch (err) {
    throw new ApiError(500, "Something went wrong while creating shop");
  }
});

const sellerCreateBook = asyncHandler(async (req, res) => {
  let { bookName, stockCount } = req.body;
  try {
    const sellerId = req.seller.sellerId;
    const shop = await db.Shop.findOne({
      where: {
        sellerId: sellerId,
      },
      raw: true,
    });

    const { shopId } = shop;

    bookName = bookName.toLowerCase();

    const isExistsBooK = await db.Book.findOne({
      where: {
        bookName,
      },
    });
    if (isExistsBooK) {
      return res.status(409).json(new ApiError(409, "Book already exists"));
    }
    const createBook = await db.Book.create({
      bookName,
      stockCount,
      sellerId,
      shopId,
    });
    res
      .status(201)
      .json(new ApiResponse(201, createBook, "book created successfully"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getBooks = async (req, res) => {
  const sellerId = req.params.sellerId;
  try {
    const books = await db.Book.findAll({
      where: { sellerId: sellerId },
    });
    res.status(200).json(new ApiResponse(201, books, "get Books successfully"));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSellerOrders = asyncHandler(async (req, res) => {
  try {
    const sellerId = req.seller.sellerId;
    const shops = await db.Shop.findAll({
      where: {
        sellerId: sellerId,
      },
      raw: true,
      // attributes: ["shopId"],
    }); // add sellerId filter

    const shopId = shops.map((shop) => shop.shopId);

    const orders = await db.Order.findAll({
      where: {
        shopId: shopId,
        // sellerId: sellerId
      },
      include: [
        {
          model: db.Seller,
          attributes: ["sellerId", "sellerName", "email"],
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// const getSellerOrders = async (req, res) => {
//   try {
//     const sellerId = req.seller.sellerId;
//     const shops = await db.Shop.findAll({
//       where: {
//         sellerId: sellerId,
//       },
//       raw: true,
//       // attributes: ["shopId"],
//     }); // add sellerId filter

//     const { shopId } = shops;
//     const orders = await db.Order.findAll({
//       where: {
//         shopId:shopId,
//         sellerId:sellerId
//       },
//       // include: [
//       //   {
//       //     model: db.Seller,
//       //     attributes: ["sellerId", "SellerName", "email"],
//       //   },
//       // ],
//     });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// extra Api
const sellerMultipleCreateShop = asyncHandler(async (req, res) => {
  try {
    const { shopName } = req.body;
    const sellerId = req.seller.sellerId;
    console.log("====sellerId===", sellerId);
    const reqBody = {
      shopName,
      sellerId,
    };
    // Remove the check for existing shop
    // need to remove unique sellerId from shop table
    const createShop = await db.Shop.create(reqBody);
    if (!createShop) {
      return res.status(404).json(new ApiError(404, "Unable to create shop"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, createShop, "Shop created successfully"));
  } catch (error) {
    console.log("======error====", error);
    throw new ApiError(500, "Something went wrong while creating shop");
  }
});

module.exports = {
  sellerRegistration,
  sellerLogin,
  sellerCreateShop,
  sellerCreateBook,
  getBooks,
  getSellerOrders,
  sellerMultipleCreateShop,
};
