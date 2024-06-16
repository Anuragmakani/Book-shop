// const { DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    shopId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shopName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER, // Change to INTEGER to match Seller's primary key type
      allowNull: false,
      unique: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  });

  return Shop;
};