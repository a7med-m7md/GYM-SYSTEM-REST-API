const db = require('../database')
const sequelize = require('sequelize')

const sport = db.define('sport', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING(45),
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

module.exports = sport