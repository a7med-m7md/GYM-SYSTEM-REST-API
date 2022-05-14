const express = require('express')
const trainerInfoController = require('../controller/trainerInfoController')
const trainerController = require('../controller/trainerController')

const router = express.Router()

router.use(trainerController.protected)
router.route('/').get(trainerInfoController.getMyInfo).post(trainerInfoController.createMyInfo)

module.exports = router