const express = require("express")
const router = express.Router()
const Controllers = require("../controllers/product")
const Upload = require("../middlewares/upload");


router.get('/', Controllers.getProduct)
router.post('/', Upload, Controllers.add)
router.patch('/:productId', Upload, Controllers.update)
router.delete('/:productId', Controllers.remove)


module.exports = router