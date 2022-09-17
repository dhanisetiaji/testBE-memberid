const express = require("express");
const app = express()
const { isLogin } = require("../middlewares/auth")
const productRoute = require("./productRoute")
const authRoute = require("./authRoute")

app.use("/products", isLogin, productRoute)
app.use("/auth", authRoute)

module.exports = app