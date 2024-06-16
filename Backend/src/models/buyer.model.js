// const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    buyerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buyerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'buyer',
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

return Buyer;
};


  