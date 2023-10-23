"use strict";
const { Model } = require("sequelize");
const { encryptPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Mobil, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: "Masukkan email yang valid!",
          },
          isEmailExist(email) {},
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password tidak boleh kosong!",
          },
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        defaultValue: "https://fakeimg.pl/600x400",
      },
      negara: { type: DataTypes.STRING, defaultValue: "Indonesia" },
      kota: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Kota tidak boleh kosong!",
          },
        },
      },
      telephone: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nomor Telepon tidak boleh kosong!",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user, option) => {
          try {
            user.password = await encryptPassword(user.password);
          } catch (e) {
            throw e;
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
