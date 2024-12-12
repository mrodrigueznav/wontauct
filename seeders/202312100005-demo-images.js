module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Obtén IDs de artículos existentes
      const items = await queryInterface.sequelize.query(
        `SELECT id FROM Items;`
      );
  
      const itemIds = items[0].map(item => item.id);
  
      if (itemIds.length === 0) {
        console.log('No items found. Add items before seeding images.');
        return;
      }
  
      // Crea imágenes de ejemplo
      const images = itemIds.flatMap(itemId => [
        {
          url: `https://example.com/images/item_${itemId}_1.jpg`,
          itemId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: `https://example.com/images/item_${itemId}_2.jpg`,
          itemId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
  
      await queryInterface.bulkInsert('Images', images);
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('Images', null, {});
    }
  };
  