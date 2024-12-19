const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    User.associate = (models) => {
      User.hasMany(models.Bid, { foreignKey: 'userId', as: 'bids' });
      User.hasMany(models.Sale, { foreignKey: 'userId', as: 'sales' });
    };
  
    return User;
  };
  