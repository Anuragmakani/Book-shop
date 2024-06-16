
module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    sellerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sellerName: {
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
      defaultValue: 'seller',
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  });

  return Seller;
};



