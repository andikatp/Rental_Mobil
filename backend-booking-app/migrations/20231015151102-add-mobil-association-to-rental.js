// In the generated migration file for the Rental model
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Mobils', 'rentalId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Rentals', // Replace with the actual table name for Rentals
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Mobils', 'rentalId');
  }
};
