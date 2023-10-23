const express = require("express");
var cors = require("cors");
const app = express();
var cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./json/apidocs.json");

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(apiDocumentation, { explorer: true })
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
