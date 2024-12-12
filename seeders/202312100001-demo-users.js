module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
        {
          username: 'demoUser1',
          email: 'demo1@example.com',
          password: 'hashedpassword1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'demoUser2',
          email: 'demo2@example.com',
          password: 'hashedpassword2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('Users', null, {});
    },
  };
  