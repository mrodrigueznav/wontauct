module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Bids', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        timestamp: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
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
        auctionId: {
          type: Sequelize.INTEGER,
          references: { model: 'Auctions', key: 'id' },
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
      await queryInterface.dropTable('Bids');
    },
  };
  