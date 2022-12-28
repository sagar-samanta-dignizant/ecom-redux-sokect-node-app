const mongoose = require("mongoose")
const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
require("dotenv").config()
const bodyParser = require("body-parser")

// const userRouter = require("./route/user")
// const adminRouter = require("./route/admin")
const { ioConnectionHandler } = require("./socket/ioConnectionHandler")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use("/images", express.static("public"))
app.use(bodyParser.json())
app.use(cors())

//database connection
mongoose
  .connect("mongodb://0.0.0.0:27017/test", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected..")
    const server = app.listen(3001, () => {
      console.log("Server running..3001")
      const io = require("./socket/socket").init(server)
      io.on("connection", ioConnectionHandler)
    })
  })
  .catch((err) => {
    console.log(err)
  })

// app.use("/user", userRouter)
// app.use("/admin", adminRouter)
app.use((err, req, res, next) => {
  console.log("err", err.message)
  res.status(500).send({ Error: err.message })
})
