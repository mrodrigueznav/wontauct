const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Auction = sequelize.define('Auction', {
    type: {
      type: DataTypes.STRING,
      allowNull: false, // regular, live
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'scheduled', // scheduled, ongoing, completed
    },
  });

  Auction.associate = (models) => {
    Auction.hasMany(models.Bid, { foreignKey: 'auctionId', as: 'bids' });
  };

  return Auction;
};
