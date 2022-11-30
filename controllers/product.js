const Product = require("../models/product")
exports.addProduct = async (req, res) => {
  try {
    const fileUrl = req.file.destination + "/" + req.file.filename
    const newProduct = new Product({
      ...req.body,
      userId: req.user.user_id,
      imgUrl: fileUrl,
    })
    const saveProduct = await newProduct.save()
    res.status(200).send({ message: "Added", product: saveProduct })
  } catch (error) {
    console.log(error)
    res.status({ message: "server error" })
  }
}
exports.updateProduct = async (req, res) => {
  try {
    const findProduct = await Product.findById({ _id: req.params.productId })
    if (findProduct.userId !== req.user.user_id) {
      return res.status(400).send("Not authorize to update this product")
    } else {
      const updateProduct = await Product.findByIdAndUpdate(
        { _id: req.params.productId },
        { ...req.body },
        { new: true }
      )
      res.status(200).send({
        message: "Succesfully updated",
        data: updateProduct,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
exports.getAllUserProduct = async (req, res) => {
  try {
    const { user_id } = req.user
    const findProduct = await Product.find({ userId: user_id })
    res.status(200).send({ product: findProduct })
  } catch (error) {
    console.log("er", error)
  }
}
