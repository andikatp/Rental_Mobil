const { User } = require("../models");
const { decryptPassword } = require("../helpers/bcrypt");
const createError = require("../middlewares/createError");
const { tokenGenerator } = require("../helpers/jsonwebtoken");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email } = req.body;
      const isUserExist = await User.findOne({where: {email}})
      if(isUserExist) {
        return next(createError(409, "User with the same email already exists"));
      }
      const newUser = await User.create(req.body);
      res
        .status(200)
        .json({ message: "User baru berhasil dibuat!", data: newUser });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        next(createError(403, "User with this email already exists"));
      } else {
        next(e);
      }
    }
  }

  static async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        next(
          createError(404, "User not found, please check your email address!")
        );
      }
      if (!(await decryptPassword(req.body.password, user.password))) {
        return next(
          createError(400, "Password incorrect, please check your password")
        );
      }
      const { id, isAdmin, password, ...otherDetails } = user.dataValues;
      const token = tokenGenerator({ id, isAdmin, password });

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: {...otherDetails}, isAdmin });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req, res) {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logout successful" });
  }
}

module.exports = AuthController;
