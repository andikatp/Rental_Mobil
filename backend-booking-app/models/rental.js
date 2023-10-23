"use strict";
const { Model } = require("sequelize");
const Mobil = require("./mobil");
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rental.hasMany(models.Mobil, {
        foreignKey: "rentalId",
      });
    }
  }
  Rental.init(
    {
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama rental tidak boleh kosong!",
          },
        },
      },
      kota: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama kota tidak boleh kosong!",
          },
        },
      },
      alamat: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Alamat tidak boleh kosong!",
          },
        },
      },
      jarak: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Jarak tidak boleh kosong!",
          },
        },
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "https://fakeimg.pl/600x400",
      },
      judul: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Judul tidak boleh kosong!",
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
      penilaian: {
        type: DataTypes.INTEGER,
        validate: {
          len: {
            args: [0, 5],
            msg: "Penilaian berisi antara 0-5",
          },
        },
      },
      mobilTermurah: {
        type: DataTypes.NUMERIC,
        validate: {
          notEmpty: {
            msg: "Mobil Termurah tidak boleh kosong!",
          },
        },
      },
      unggulan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeDestroy: async (rental, options) => {
          try {
            console.log(rental);
            await Mobil.destroy({
              where: {
                rentalId: rental.id,
              },
            });
          } catch (e) {
            throw e;
          }
        },
      },
      sequelize,
      modelName: "Rental",
    }
  );

  return Rental;
};
