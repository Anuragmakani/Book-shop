// require('dotenv').config({path: './env'})
const { Sequelize, DataTypes } = require("sequelize");

const getDBConnection = () => {
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER_NAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST_NAME,
      dialect: "postgres",
      port: process.env.DB_POST,
    }
  );
};


const sequelize = getDBConnection();
const db = {};

db.Seller = require("../models/seller.model")(sequelize, DataTypes);
db.Shop = require("../models/shop.model")(sequelize, DataTypes);
db.Book = require("../models/book.model")(sequelize, DataTypes);
db.Buyer = require("../models/buyer.model")(sequelize, DataTypes);
db.Order = require("../models/order.model")(sequelize, DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Association
db.Seller.hasMany(db.Book, { foreignKey: "sellerId" });
db.Book.belongsTo(db.Seller, { foreignKey: "sellerId" });

db.Seller.hasOne(db.Shop, { foreignKey: "sellerId" });
db.Shop.belongsTo(db.Seller, { foreignKey: "sellerId" });

db.Shop.hasMany(db.Book, { foreignKey: "shopId" });
db.Book.belongsTo(db.Shop, { foreignKey: "shopId" });

db.Buyer.hasMany(db.Order, { foreignKey: "buyerId" });
db.Order.belongsTo(db.Buyer, { foreignKey: "buyerId" });

db.Shop.hasMany(db.Order, { foreignKey: "shopId" });
db.Order.belongsTo(db.Shop, { foreignKey: "shopId" });

db.Book.hasMany(db.Order, { foreignKey: "bookId" });
db.Order.belongsTo(db.Book, { foreignKey: "bookId" });

db.Seller.hasMany(db.Order, { foreignKey: "shopId" });
db.Order.belongsTo(db.Seller, { foreignKey: "shopId"});

module.exports = {
  db,
  sequelize,
  getDBConnection,
};


