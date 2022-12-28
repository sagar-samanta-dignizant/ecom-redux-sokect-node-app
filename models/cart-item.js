const mongoose = require("mongoose")
const cartItemSchema = mongoose.Schema({
  cartId: {
    type: String,
    required: true,
  },
  productId: [{ type: String, ref: "Product" }],
  quantity: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
})
const CartItem = mongoose.model("CartItem", cartItemSchema)
module.exports = CartItem
