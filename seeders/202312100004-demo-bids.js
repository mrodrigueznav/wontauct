module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Bids', [
        {
          amount: 120,
          timestamp: new Date(),
          userId: 1,
          itemId: 1,
          auctionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 160,
          timestamp: new Date(),
          userId: 2,
          itemId: 2,
          auctionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('Bids', null, {});
    },
  };
  