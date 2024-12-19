'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'userId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      allowNull: false
    });

    await queryInterface.addColumn('users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.addColumn('users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.addColumn('users', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'userId');
    await queryInterface.removeColumn('users', 'isAdmin');
    await queryInterface.removeColumn('users', 'isVerified');
    await queryInterface.removeColumn('users', 'username');
    await queryInterface.removeColumn('users', 'avatar');

  }
};
