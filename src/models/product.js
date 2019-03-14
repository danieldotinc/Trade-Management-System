const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  mongoose.Schema({
    img: String,
    imgs: [String],
    imgFile: [String],
    imgFiles: [String],
    file: String,
    files: [String],
    category: String,
    proCode: Number,
    diverseCode: Number,
    name: String,
    brand: String,
    buyPrice: Number,
    refPrice: Number,
    breakEvenPrice: Number,
    wholePrice: Number,
    retailPrice: Number,
    marketPlacePrice: Number,
    retailStoreStock: Number,
    wholeStoreStock: Number,
    virtualStoreStock: Number,
    boxQuantity: Number,
    created: { type: Date, default: Date.now }
  })
);

exports.Product = Product;
