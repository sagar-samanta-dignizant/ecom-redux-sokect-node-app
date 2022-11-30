const express = require("express")
const { addProduct, updateProduct } = require("../controllers/product")
const { authentication } = require("../middleware/authentication")
const upload = require("../middleware/upload")
const router = express()

router.post("/addProduct", authentication, upload.single("file"), addProduct)
router.put("/updateProduct/:productId", authentication, updateProduct)

module.exports = router
