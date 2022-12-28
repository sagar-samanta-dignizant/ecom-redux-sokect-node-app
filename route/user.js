// const express = require("express")
// const { body, param } = require("express-validator/check")

// const {
//   registerUser,
//   getUserDetails,
//   updateUser,
//   deleteUser,
//   login,
//   getAnyProduct,
// } = require("../controllers/user")
// const { authentication } = require("../middleware/authentication")
// const router = express()
// router.get("/getAnyProduct", getAnyProduct)
// //get user data
// router.get("/:userId", getUserDetails)

// //register user
// router.post(
//   "/register",
//   [
//     body("name").trim().isLength({ min: 1 }),
//     body("email").trim().isEmail().withMessage("Not a valid Email"),
//     body("password").custom((value, { req }) => {
//       console.log(value, req.body)
//       if (value !== req.body.password) {
//         throw new Error("Password confirmation does not match password")
//       }
//       return true
//     }),
//   ],
//   registerUser
// )
// router.post("/login", login)
// //update user data
// router.put("/:userId", updateUser)
// //remove user
// router.delete(
//   "/:userId",
//   param("userId").customSanitizer(
//     (value) => {
//       var ObjectId = require("mongoose").Types.ObjectId
//       //true
//       if (!ObjectId.isValid(value)) {
//         throw new Error("Not a valid id")
//       }
//       return true
//     },
//     (req, res) => {
//       res.status(500).send("error")
//     }
//   ),
//   deleteUser
// )

// module.exports = router
