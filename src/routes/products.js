const express = require("express");
const { Product } = require("../models/product");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort("created");
  res.send(products);
});

router.post("/", async (req, res) => {
  try {
    // console.log("Body", req);
    let product = new Product({ name: req.body.name });

    product = await product.save();
    res.send(product);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(product);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product)
      return res.status(404).send("The product with given id not found!");
    res.send(product);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).send("The product with given id not found!");
    res.send(product);
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
