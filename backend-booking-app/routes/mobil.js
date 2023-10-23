const mobilRoute = require("express").Router();
const { MobilController } = require("../controllers");
const { verifyAdmin, verifyUser, verifyUserBooking } = require("../middlewares/verifyToken");

mobilRoute.get("/", MobilController.getMobils);
mobilRoute.get("/countByType", MobilController.countByType);
mobilRoute.get("/:id", MobilController.getMobil);
mobilRoute.post("/create/:rentalId", verifyAdmin, MobilController.create);
mobilRoute.put("/update/:id", verifyAdmin, MobilController.update);
mobilRoute.delete("/delete/:id", verifyAdmin, MobilController.delete);
mobilRoute.post("/booking/:id", verifyUserBooking, MobilController.bookingCar);

module.exports = mobilRoute;
