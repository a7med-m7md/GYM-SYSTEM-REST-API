const express = require('express')
const clientController = require('../controller/clientController')
const membershipController = require('../controller/membershipController')
const router = express.Router()


router.use(clientController.protected)
router.route('/').get(membershipController.getMembership)

module.exports = router