const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
  userId: {
    type: String,
    trim: true,
    require: true,
  },
  productName: {
    type: String,
    trim: true,
  },
  imgUrl: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
})
const Product = mongoose.model("Product", productSchema)
module.exports = Product
