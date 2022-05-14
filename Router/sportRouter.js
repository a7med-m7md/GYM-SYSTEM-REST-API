const express = require('express')
const sportController = require('../controller/sportController')
const clientController = require('../controller/clientController')
const router = express.Router()

router.route('/').get(sportController.getAllSports).post(sportController.createNewSport)
router.use(clientController.protected)
router.get('/me', sportController.getMySports)


module.exports = router