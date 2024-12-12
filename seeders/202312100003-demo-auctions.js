module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Auctions', [
        {
          type: 'regular',
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 3600000), // 1 hora después
          status: 'scheduled',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'live',
          startTime: new Date(),
          status: 'ongoing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('Auctions', null, {});
    },
  };
  