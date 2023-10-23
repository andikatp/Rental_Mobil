"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mobil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mobil.belongsTo(models.Rental, { foreignKey: "id" });
      Mobil.belongsTo(models.User, { foreignKey: "id" });
    }
  }
  Mobil.init(
    {
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama tidak boleh kosong!",
          },
        },
      },
      harga: {
        type: DataTypes.NUMERIC,
        validate: {
          notEmpty: {
            msg: "Harga tidak boleh kosong!",
          },
        },
      },
      tipe: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Tipe tidak boleh kosong!",
          },
        },
      },
      maksimalAngkutan: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: "Maksimal Angkutan harus antara 0 - 12 penumpang1!",
          },
          max: {
            args: [12],
            msg: "Maksimal Angkutan harus antara 0 - 12 penumpang!",
          },
        },
      },
      deskripsi: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Deskripsi tidak boleh kosong!",
          },
        },
      },
      photo: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
      nomorMobil: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [
          {
            number: 1,
            unavailableDates: [],
          },
        ],
      },
      rentalId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "ID rental tidak boleh kosong!",
          },
        },
      },
      userId: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      hooks: {
        beforeCreate: (mobil, options) => {
          const modifiedNomorMobil = mobil.dataValues.nomorMobil.map(
            (item) => ({
              number: item.number,
              unavailableDates: item.unavailableDates || [],
            })
          );
          // console.log(modifiedNomorMobil)
          mobil.nomorMobil = modifiedNomorMobil;
        },
      },
      sequelize,
      modelName: "Mobil",
    }
  );
  return Mobil;
};
