const db = require('../database')
const sequelize = require('sequelize')

const excercise = db.define('excercise', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING,
    }
},
    {
        timestamps: false,
        // If don't want createdAt
        createdAt: false,
        // If don't want updatedAt
        updatedAt: false
    }
)

module.exports = excercise