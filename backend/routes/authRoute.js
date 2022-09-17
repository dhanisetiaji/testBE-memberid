const express = require("express")
const router = express.Router()
const Controllers = require("../controllers/auth")


router.post('/', Controllers.login)


module.exports = router