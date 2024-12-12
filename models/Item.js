const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currentPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    msrp: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    condition: {
      type: DataTypes.ENUM('new', 'like-new', 'used', 'damaged'),
      allowNull: false,
      defaultValue: 'new',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending', // pending, active, sold
    },
    playerCount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.ENUM('es', 'en'),
      allowNull: false,
      defaultValue: 'es',
    },
    bggRating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Item.associate = (models) => {
    Item.hasMany(models.Image, { foreignKey: 'itemId', as: 'images' });
    Item.hasMany(models.Bid, { foreignKey: 'itemId', as: 'bids' });
    Item.hasOne(models.Sale, { foreignKey: 'itemId', as: 'sale' });
  };

  return Item;
};
