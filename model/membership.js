const db = require('../database')
const sequelize = require('sequelize')

const membership = db.define('membership', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    status: {
        type: sequelize.STRING,
        default: "Inactive",
    },
    date: {
        type: sequelize.DATE,
        allowNull: true
    },
    period: {
        type: sequelize.INTEGER,
    },
}, {
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false
})

module.exports = membership