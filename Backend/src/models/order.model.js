// const { DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      buyerId: {
          type: DataTypes.INTEGER, // Change to INTEGER to match Buyer's primary key type
          allowNull: false,
      },
      shopId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      bookId: {
          type: DataTypes.INTEGER, // Change to INTEGER to match Book's primary key type
          allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
    });
  
    return Order;
  };




