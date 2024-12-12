module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Sales', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        salePrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: 'pending', // pending, completed, shipped
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: { model: 'Users', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: false,
        },
        itemId: {
          type: Sequelize.INTEGER,
          references: { model: 'Items', key: 'id' },
          onDelete: 'CASCADE',
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable('Sales');
    },
  };
  