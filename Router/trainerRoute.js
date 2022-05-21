const express = require('express')
const router = express.Router()
const trainerController = require('../controller/trainerController')

router.post('/login', trainerController.login)
router.get('/', trainerController.getAllTrainers)
router.use(trainerController.protected)
router.get('/me', trainerController.getMe)
router.post('/logout', trainerController.logOut)
router.get('/allmytrainers', trainerController.getAllMyUsers)
router.route('/:id').get(trainerController.getInfo).post(trainerController.editCurrentClient)

module.exports = router