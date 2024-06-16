// const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stockCount:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    // image:{
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

return Book;
};
