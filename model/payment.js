const db = require('../database')
const sequelize = require('sequelize')

const payment = db.define('payment', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    amount: {
        type: sequelize.DOUBLE,
        allowNull: false,
    },
    date: {
        type: sequelize.DATEONLY,
    },
    method: {
        type: sequelize.STRING,
    },
}, {
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false
})

module.exports = payment