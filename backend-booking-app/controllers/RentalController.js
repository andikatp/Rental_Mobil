const { Rental, Mobil } = require("../models");
const createError = require("../middlewares/createError");

class RentalController {
  static async getRentals(req, res, next) {
    try {
      let rentals = await Rental.findAll({
        include: [Mobil],
        order: [["id", "ASC"]],
      });
      let mobil;
      rentals.forEach((rental) => {
        mobil = rental.dataValues.Mobils.map((mobil) => {
          return mobil.id;
        });
        delete rental.dataValues.Mobils;
      });

      rentals = rentals.map((rental) => {
        return { ...rental.dataValues, mobilId: mobil };
      });
      res.status(200).json(rentals);
    } catch (err) {
      next(err);
    }
  }

  static async getFeatured(req, res, next) {
    try {
      let rentals = await Rental.findAll({
        limit: 4,
        where: {
          unggulan: true,
        },
        order: [["id", "ASC"]],
      });
      res.status(200).json(rentals);
    } catch (err) {
      next(err);
    }
  }


  static async create(req, res, next) {
    try {
      const newRental = await Rental.create(req.body);
      res
        .status(200)
        .json({
          message: "Rental baru berhasil ditambahkan!",
          data: newRental,
        });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const rentalExist = await Rental.findByPk(id);
      if (!rentalExist) {
        return next(createError(404, "Rental not found"));
      }
      const response = await Rental.update(req.body, { where: { id } });
      if (response === 0) {
        return next(createError(500, "Rental cant be updated"));
      }
      res.status(200).json({ message: "Rental has been updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const rentalExist = await Rental.findByPk(id);
      if (!rentalExist) {
        return next(createError(404, "Rental not found"));
      }
      await Mobil.destroy({
        where: {
          rentalId: id,
        },
      });
      const response = await Rental.destroy({
        where: {
          id,
        },
      });
      if (response === 0) {
        return next(createError(500, "Rental cant be deleted"));
      }
      res.status(200).json({ message: "Rental has been deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async getRental(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const rental = await Rental.findByPk(id);
      if (!rental) {
        return next(createError(404, "Rental not found"));
      }
      res.status(200).json(rental);
    } catch (err) {
      next(err);
    }
  }

  static async countByCity(req, res, next) {
    try {
      const kota = req.query.kota.split(",");
      let list = await Promise.all(
        kota.map((kota) => {
          return Rental.findAndCountAll({
            where: {
              kota,
            },
          });
        })
      );
      list = list.map((data) => data.count);
      res.status(200).send(list);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RentalController;
