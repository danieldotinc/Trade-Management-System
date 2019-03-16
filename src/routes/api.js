require("express-async-errors");
const error = require("../middleware/error");
const express = require("express");
const mongoose = require("mongoose");
const products = require("./products");
const users = require("./users");
const auth = require("./auth");
const config = require("config");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("Fatal Error: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/store-manager")
  .then(() => console.log("Connected to MongoDB ..."))
  .catch(err => console.error("Could not connect to MongoDB ..."));

app.use(express.json());

app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

app.listen(3000);
