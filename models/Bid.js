module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    Bid.associate = (models) => {
      Bid.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Bid.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
      Bid.belongsTo(models.Auction, { foreignKey: 'auctionId', as: 'auction' });
    };
  
    return Bid;
  };
  