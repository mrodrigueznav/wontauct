module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      salePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // pending, completed, shipped
      },
    });
  
    Sale.associate = (models) => {
      Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'buyer' });
      Sale.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
    };
  
    return Sale;
  };
  