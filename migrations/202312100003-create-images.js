module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Images', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        url: {
          type: Sequelize.STRING,
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
      await queryInterface.dropTable('Images');
    },
  };
  