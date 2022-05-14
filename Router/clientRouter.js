const express = require('express')
const clientController = require('../controller/clientController')
const router = express.Router()


router.post('/login', clientController.login)
router.post('/signup', clientController.signup)
router.use(clientController.protected)
router.route('/').get(clientController.getAllClients)
router.post('/logout', clientController.logOut)
router.route('/me').get(clientController.getMe)

module.exports = router

