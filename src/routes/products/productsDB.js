const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/store-manager")
  .then(() => console.log("Connected to MongoDB ..."))
  .catch(err => console.error("Could not connect to MongoDB ..."));

const productSchema = mongoose.Schema({
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
});

const Product = mongoose.model("Product", productSchema);

async function createProduct(item) {
  const product = new Product(item);
  return await product.save();
}

async function getAllProducts() {
  try {
    console.log("Getting all the products ...");
    const products = await Product.find();
    // console.log(products);
    return products;
  } catch (err) {
    console.log(err);
  }
}

module.exports.addProduct = createProduct;
module.exports.getProducts = getAllProducts;
