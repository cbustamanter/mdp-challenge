const express = require("express");
const morgan = require("morgan");
const routes = require("../api/routes/v1");
const cors = require("cors");
const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);

module.exports = app;
