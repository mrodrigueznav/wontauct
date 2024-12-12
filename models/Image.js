module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Image.associate = (models) => {
      Image.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
    };
  
    return Image;
  };
  