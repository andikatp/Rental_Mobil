'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
      },
      kota: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      jarak: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      judul: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      penilaian: {
        type: Sequelize.INTEGER
      },
      mobilTermurah: {
        type: Sequelize.NUMERIC
      },
      unggulan: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rentals');
  }
};