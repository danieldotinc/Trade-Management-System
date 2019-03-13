const express = require("express");
const products = require("./products/products");
const app = express();

app.use(express.json());

app.use("/api/products", products);

app.listen(3000);
