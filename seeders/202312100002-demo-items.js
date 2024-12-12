module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Items', [
        {
          name: 'CATAN',
          description: 'A classic board game from the 80s.',
          startingPrice: 100,
          msrp: 0,
          currentPrice: 100,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'GLOOMHAVEN',
          description: 'A rare set of collectible cards.',
          startingPrice: 150,
          msrp: 0,
          currentPrice: 150,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Wingspan',
          description: 'A rare set of collectible cards.',
          startingPrice: 150,
          msrp: 0,
          currentPrice: 150,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('Items', null, {});
    },
  };
  