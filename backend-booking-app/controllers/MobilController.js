const { Op } = require("sequelize");
const createError = require("../middlewares/createError");
const { Mobil, Rental } = require("../models");
const { tokenVerifier } = require("../helpers/jsonwebtoken");

class MobilController {
  static async getMobils(req, res, next) {
    try {
      let mobils;
      if (req.query.kota && req.query.penumpang) {
        const { kota, penumpang } = req.query;
        mobils = await Mobil.findAll({
          include: [Rental],
          where: {
            "$Rental.kota$": kota,
            maksimalAngkutan: {
              [Op.gte]: penumpang,
            },
            userId: null,
          },
          order: [["id", "ASC"]],
        });
      } else {
        mobils = await Mobil.findAll({
          limit: 5,
          include: [Rental],
          order: [["id", "ASC"]],
        });
      }
      res.status(200).json(mobils);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const rentalId = parseInt(req.params.rentalId);
      const isRentalExist = await Rental.findByPk(rentalId);

      if (!isRentalExist) {
        return next(
          createError(404, "Rental tidak ditemukan, mohon perika ID rental!")
        );
      }
      const response = await Mobil.create({ ...req.body, rentalId });
      res
        .status(200)
        .json({ message: "Mobil berhasil ditambahkan!", data: response });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const isCarExist = await Mobil.findByPk(id);
      if (!isCarExist) {
        return next(createError(404, "Mobil tidak ditemukan!"));
      }

      const response = await Mobil.update(req.body, {
        where: {
          id,
        },
      });

      if (response === 0) {
        return next(createError(500, "Mobil tidak dapat diupdate!"));
      }
      res.status(200).json({ message: "Mobil berhasil diupdate!" });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const isCarExist = await Mobil.findByPk(id);

      if (!isCarExist) {
        return next(createError(404, "Mobil tidak ditemukan!"));
      }

      const response = await Mobil.destroy({
        where: {
          id,
        },
      });

      if (response === 0) {
        return next(createError(500, "Mobil tidak dapat dihapus!"));
      }
      res.status(200).json({ message: "Mobil berhasil dihapus!" });
    } catch (err) {
      next(err);
    }
  }

  static async getMobil(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const mobil = await Mobil.findByPk(id, {
        include: [Rental],
      });

      if (!mobil) {
        return next(createError(404, "Mobil tidak ditemukan!"));
      }

      res.status(200).json(mobil);
    } catch (err) {
      next(err);
    }
  }

  static async countByType(req, res, next) {
    try {
      const tipe = [
        "Motor Matic",
        "Motor Manual",
        "Mobil Matic",
        "Mobil Manual",
        "Mobil Listrik",
      ];
      let list = await Promise.all(
        tipe.map((tipe) => Mobil.findAndCountAll({ where: { tipe } }))
      );
      list = list.map((list, index) => {
        return { tipe: tipe[index], jumlah: list.count };
      });
      res.send(list);
    } catch (err) {
      next(err);
    }
  }

  static async bookingCar(req, res, next) {
    try {
      const isCarExist = await Mobil.findByPk(req.params.id);
      if (!isCarExist) {
        return next(createError(404, "Mobil Tidak Ditemukan"));
      }
      const token = req.cookies.access_token;
      tokenVerifier(token, async (err, decoded)=> {
        if(err) {
            return next(createError(403, "Token is invalid"));
        }
        const userId = decoded.id;
        const updateData = {
          userId,
        };  
         await Mobil.update(updateData, { where: { id: req.params.id } });
        res.status(200).json({ message: "Mobil berhasil dibooking!" })
    })
    } catch (e) {
      next(e);
    }
  }
}

module.exports = MobilController;
