const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
  },
  address: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
  type: {
    type: String,
    trim: true,
    default: "Admin",
  },
})

module.exports = mongoose.model("User", userSchema)
