// In the generated migration file for the User model
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Mobils', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Replace with the actual table name for Users
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Mobils', 'userId');
  }
};
