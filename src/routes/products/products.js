const express = require("express");
const proDB = require("./productsDB");

const router = express.Router();

router.get("/", (req, res) => {
  const products = new Promise((resolve, reject) => {
    resolve(proDB.getProducts());
  });

  products.then(result => res.send(result));
});

module.exports = router;
