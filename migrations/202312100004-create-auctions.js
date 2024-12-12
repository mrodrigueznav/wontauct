module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Auctions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false, // regular, live
        },
        startTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endTime: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: 'scheduled', // scheduled, ongoing, completed
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
      await queryInterface.dropTable('Auctions');
    },
  };
  