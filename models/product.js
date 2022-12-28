const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
  createdBy: {
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

  price: {
    type: Number,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  companyName: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    trim: true,
    default: 1,
  },
})
const Product = mongoose.model("Product", productSchema)
module.exports = Product
