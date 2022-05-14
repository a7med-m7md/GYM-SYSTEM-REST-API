const express = require('express')
const infoController = require('../controller/infoController')
const clientController = require('../controller/clientController')

const router = express.Router()

router.use(clientController.protected)
router.route('/').get(infoController.getMyInfo).post(infoController.createMyInfo)

module.exports = router