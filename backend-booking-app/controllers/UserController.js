const createError = require('../middlewares/createError');
const { User }  = require('../models');

class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll({ include: [Mobil], order: [['id', 'ASC']] });
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const userExist = await User.findByPk(id);
      if(!userExist) {
        return next(createError(404, "User not found"));
      }
      const response = await User.update(req.body, { where: { id } });
      if(response === 0){
        return next(createError(500, "User cant be updated"));
      } 
      res.status(200).json({message: "User has been updated successfully"});
    } catch (err) {
        next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const userExist = await User.findByPk(id);
      if(!userExist) {
        return next(createError(404, "User not found"));
      }
      const response = await User.destroy({
        where: {
          id,
        },
      });
      if(response === 0){
        return next(createError(500, "User cant be deleted"));
      } 
      res.status(200).json({message: "User has been deleted successfully"});
    } catch (err) {
        next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.findByPk(id);
        if(!user) {
          return next(createError(404, "User not found"));
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
  }
}

module.exports = UserController;