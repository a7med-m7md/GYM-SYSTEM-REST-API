const express = require('express')
const router = express.Router()
const trainerController = require('../controller/trainerController')

router.post('/login', trainerController.login)
router.use(trainerController.protected)
router.get('/me', trainerController.getMe)
router.post('/logout', trainerController.logOut)

module.exports = router