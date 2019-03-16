const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const { Product } = require("../models/product");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const products = await Produ.find().sort("created");
  res.send(products);
});

router.post("/", auth, async (req, res) => {
  const product = new Product({ name: req.body.name });
  await product.save();
  res.send(product);
});

router.put("/:id", auth, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.send(product);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return res.status(404).send("The product with given id not found!");
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The product with given id not found!");
  res.send(product);
});

module.exports = router;
