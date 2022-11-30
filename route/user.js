const express = require("express")
const {
  registerUser,
  getUserDetails,
  updateUser,
  deleteUser,
  login,
  getAllProduct,
  getAllUserProduct,
} = require("../controllers/user")
const { authentication } = require("../middleware/authentication")
const router = express()

//get user data
router.get("/:userId", getUserDetails)

//register user
router.post("/register", registerUser)
router.post("/login", login)
//update user data
router.put("/:userId", updateUser)
//remove user
router.delete("/:userId", deleteUser)
module.exports = router
