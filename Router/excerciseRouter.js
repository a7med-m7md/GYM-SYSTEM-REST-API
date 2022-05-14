const express = require('express')
const excerciseController = require('../controller/excerciseController')
const router = express.Router()

router.route('/').get(excerciseController.getAllExcercise).post(excerciseController.createNewExcercise)

module.exports = router