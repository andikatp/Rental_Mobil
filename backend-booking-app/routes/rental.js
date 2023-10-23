const rentalRoute = require("express").Router();
const { RentalController } = require("../controllers");
const { verifyAdmin } = require("../middlewares/verifyToken");

rentalRoute.get("/", RentalController.getRentals);
rentalRoute.get("/getfeatured", RentalController.getFeatured);
rentalRoute.get("/countByCity", RentalController.countByCity);
rentalRoute.post("/create", verifyAdmin, RentalController.create);
rentalRoute.put("/update/:id", verifyAdmin, RentalController.update);
rentalRoute.delete("/delete/:id", verifyAdmin, RentalController.delete);
rentalRoute.get("/:id", verifyAdmin, RentalController.getRental);
rentalRoute.get("/:id", verifyAdmin, RentalController.getRental);


module.exports = rentalRoute;
