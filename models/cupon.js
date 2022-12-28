const mongoose = require("mongoose")
const cuponSchema = mongoose.Schema({
  code: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    trim: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    trim: true,
    default: 0,
  },
  expireAt: {
    type: Date,
    trim: true,
    default: new Date(),
    expires: 20,
  },
})
// cuponSchema.index({ expireAt: 1 }, { expireAfterSeconds: 30 })
const Cupon = mongoose.model("Cupon", cuponSchema)
module.exports = Cupon
