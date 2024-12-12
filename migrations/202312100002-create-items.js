module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      startingPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currentPrice: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      msrp: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      playerCount: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'es',
        validate: {
          isIn: [['es', 'en']],
        },
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      releaseYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bggRating: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'new',
        validate: {
          isIn: [['new', 'like-new', 'used', 'damaged']],
        },
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending', // pending, active, sold
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Items');
  },
};
