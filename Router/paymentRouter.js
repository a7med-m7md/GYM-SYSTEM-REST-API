const express = require('express')
const clientController = require('../controller/clientController')
const paymentController = require('../controller/paymentController')
const router = express.Router()

router.use(clientController.protected)
router.post('/', paymentController.pay)

module.exports = router