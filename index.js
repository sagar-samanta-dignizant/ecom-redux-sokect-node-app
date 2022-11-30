const mongoose = require("mongoose")
const express = require("express")
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")

const userRouter = require("./route/user")
const productRouter = require("./route/product")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//database connection
mongoose
  .connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected..")
  })
  .catch((err) => {
    console.log(err)
  })

app.use("/user", userRouter)
app.use("/Product", productRouter)
app.use((req, res, next) => {})

app.listen(3000, () => {
  console.log("Server running..")
})
