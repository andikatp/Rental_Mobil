'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      // First, remove the existing foreign key constraint

      // Then, add the new foreign key constraint
      await queryInterface.addConstraint('Mobils', {
        fields: ['userId'],
        type: 'FOREIGN KEY',
        name: 'mobils_userId_fkey',
        references: {
          table: 'Users', // Replace with the actual name of the Rentals table
          field: 'id',       // Replace with the actual name of the primary key in the Rentals table
        },
        onDelete: 'CASCADE', // Choose the appropriate onDelete behavior
        onUpdate: 'CASCADE', // Choose the appropriate onUpdate behavior
      }, { transaction: t });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      // To revert the changes, you can remove the foreign key constraint
      await queryInterface.removeConstraint('Mobils', 'mobils_userId_fkey', { transaction: t });
    });
  },
};
