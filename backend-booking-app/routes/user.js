const userRoute = require("express").Router();
const { UserController } = require("../controllers");
const { verifyAdmin, verifyUser } = require("../middlewares/verifyToken");

userRoute.get("/", verifyAdmin, UserController.getUsers);
userRoute.get("/:id", verifyUser, UserController.getUser);
userRoute.put("/update/:id", verifyUser, UserController.update);
userRoute.delete("/delete/:id", verifyUser, UserController.delete);

module.exports = userRoute;
