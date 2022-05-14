const sequelize = require('sequelize')

const connection = new sequelize('gym_', 'root', '123456789', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = connection