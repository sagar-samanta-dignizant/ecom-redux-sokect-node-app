const User = require("../models/user")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../middleware/authentication")

exports.registerUser = async (req, res) => {
  try {
    const { name, email, address, password } = req.body

    // Validate user input
    if (!(email && name && password)) {
      return res.status(400).send("Email,Name and Password can't be empty!")
    }

    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).send("User Already Exist")
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ ...req.body, password: encryptedPassword })
    const user = await newUser.save()

    res.status(200).send({
      message: "User registration succesfull!",
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Server error",
    })
  }
}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send("Email and password are required!")
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateToken(user)
      user.token = token
      return res.status(200).send({ user, token })
    }
    res.status(400).send("Invalid Credentials")
  } catch (error) {
    console.log(error)
    res.status(500).send("Server error")
  }
}

exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById({ _id: userId })
    if (!user) return res.status(201).send({ message: "user not found" })
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Server error",
    })
  }
}
exports.updateUser = async (req, res) => {
  try {
    const validUser = await User.findOne({ _id: req.params.userId })
    if (validUser.length == 0) {
      return res.status(201).send({
        message: "User not found",
      })
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { ...req.body },
      { new: true }
    )
    res.status(200).send({
      user: updateUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Server error",
    })
  }
}
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.userId })
    res.status(200).send({ message: "Successfull" })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Server error",
    })
  }
}
