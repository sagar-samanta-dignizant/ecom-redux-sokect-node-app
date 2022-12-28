const Product = require("../../models/product")
const User = require("../../models/user")
const fs = require("fs")
const {
  sendProductEvents,
  updateProductEvents,
  deleteProductEvents,
  viewProductEvents,
  sendCreatedCupon,
} = require("../../socket/actions")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../../middleware/authentication")
const Cupon = require("../../models/cupon")
const { DateTime } = require("luxon")
const moment = require("moment/moment")
exports.login = async (data) => {
  try {
    const { email, password } = data
    if (!(email && password)) {
      // return httpError(res, 400, "Email and password are required!")
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateToken(user)
      user.token = token
      return {
        user,
        token,
      }
      // return res.status(200).send({ user, token })
    }
    // return httpError({
    //   response: res,
    //   statusCode: 400,
    //   message: "Invalid Credentials",
    // })
    console.log("Invalid credentials")
  } catch (error) {
    console.log(error)
  }
}
exports.addProduct = async (recvDta) => {
  const { file, values } = recvDta
  try {
    fs.writeFile("test.png", file, { encoding: "base64" }, (err) => {
      if (err) console.log(err)
      else {
        console.log("File written successfully\n")
        console.log("The written has the following contents:")
      }
    })
    const newProduct = new Product({
      ...values,
      imgUrl: file.toString("base64"),
      createdBy: values?.requestUserId,
    })
    const saveProduct = await newProduct.save()
    sendProductEvents(saveProduct)
  } catch (error) {
    console.log(error)
  }
}
exports.updateProduct = async (data) => {
  try {
    const product = await Product.findOne({ _id: data.id })
    if (!product) {
      console.log("product not found")
    }
    // if (product.createdBy !== data.requestUserId) {
    //   return console.log("Not authenticate")
    // }
    const updatePro = await Product.findByIdAndUpdate(
      { _id: data.id },
      {
        productName: data.productName || product.productName,
        price: data.price || product.price,
        companyName: data.companyName || product.companyName,
        category: data.category || product.category,
      },
      { new: true }
    )
    updateProductEvents(updatePro)
  } catch (error) {
    console.log(error)
  }
}
exports.deleteProduct = async (data) => {
  try {
    const product = await Product.findOne({ _id: data })
    if (!product) {
      console.log("Product not found")
    }
    await Product.findByIdAndDelete({ _id: data })
    deleteProductEvents(data)
  } catch (error) {
    console.log(error)
  }
}
exports.getSelectedproduct = async (data) => {
  try {
    const findProducts = await Product.find({ _id: data._id })
    return findProducts
  } catch (error) {}
}
exports.getAllProduct = async () => {
  const products = await Product.find()
  return products
}
exports.getUserDetails = async (data) => {
  const user = await User.findById(data)
  return user
}
exports.addCupon = async (data) => {
  const findCupon = await Cupon.findOne()
  let saveData
  if (findCupon) {
    findCupon.code = data.code
    findCupon.expireAt = data.expireAt
    findCupon.createdAt = data.createdAt
    findCupon.amount = data.amount
    saveData = await findCupon.save()
  } else {
    const newCupon = new Cupon({
      ...data,
    })
    saveData = await newCupon.save()
  }

  sendCreatedCupon(saveData)
}
exports.getCuponData = async () => {
  const cupon = await Cupon.findOne()
  return cupon
}
exports.verifyToken = async (data) => {
  const coupon = await Cupon.findOne()
  const isValid = moment(coupon?.expireAt).isSameOrAfter(new Date())
  const isCodeValid = coupon.code === data
  if (!isCodeValid) {
    return {
      Message: "Invalid Coupon",
    }
  } else if (!isValid) {
    return {
      Message: "Coupon Expire",
    }
  } else if (isCodeValid && isValid) {
    return {
      coupon,
    }
  }
}
