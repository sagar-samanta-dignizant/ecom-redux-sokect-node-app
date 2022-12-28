const jwt = require("jsonwebtoken")

exports.generateToken = async (user) => {
  const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  })
  return token
}
exports.authenticate = async (token) => {
  if (!token) {
    return console.log("No token")
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    return decoded
  } catch (error) {
    console.log("Invaid token")
  }
}
// exports.authentication = (req, res, next) => {
//   const token =
//     req.body.token ||
//     req.query.token ||
//     req.headers["x-access-token"] ||
//     req.headers["Authorization"]
//   if (!token) {
//     return res.status(403).send({
//       message: "A token is required for authentication",
//     })
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN_KEY)
//     req.user = decoded
//   } catch (error) {
//     console.log(error)
//     return res.status(401).send({
//       message: "Invalid Token",
//     })
//   }
//   return next()
// }
