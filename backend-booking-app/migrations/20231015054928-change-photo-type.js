"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Rentals", "photo", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn('Rentals', 'photo', {
        type: Sequelize.ARRAY(Sequelize.STRING), 
        allowNull: true, 
      });
  },
};
