
// import { User } from "../models/user.model.js";

const { db } = require('../db/index.js');
const {ApiError} = require('../utils/ApiError.js');
const {asyncHandler} = require('../utils/asyncHandler.js');
const jwt = require('jsonwebtoken');

 const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        console.log('========decodedToken====',decodedToken);

        if (decodedToken.role === 'seller') {
            const seller = await db.Seller.findOne({
                where:{
                    email: decodedToken?.email
                }
            })

            if (!seller) {
                throw new ApiError(401, "Invalid Access Token")
            }
        console.log('=======seller=====',seller);
            req.seller = seller.dataValues;
            next()
        }

        if (decodedToken.role === 'buyer') {
            const buyer = await db.Buyer.findOne({
                where:{
                    email: decodedToken?.email
                }
            })

            if (!buyer) {
                throw new ApiError(401, "Invalid Access Token")
            }
            console.log('=======buyer=======',buyer);
            req.buyer = buyer.dataValues
            next()
        }

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

const generateAccessToken = async(payload) =>{
    try {
      if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new ApiError(409,"ACCESS_TOKEN_SECRET is not defined");
      }
      return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      });
    } catch (error) {
      throw error;
    }
}

module.exports = {
    generateAccessToken,
    verifyJWT
}