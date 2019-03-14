const express = require("express");
const mongoose = require("mongoose");
const products = require("./products");

mongoose
  .connect("mongodb://localhost/store-manager")
  .then(() => console.log("Connected to MongoDB ..."))
  .catch(err => console.error("Could not connect to MongoDB ..."));

const app = express();

app.use(express.json());

app.use("/api/products", products);

app.listen(3000);
