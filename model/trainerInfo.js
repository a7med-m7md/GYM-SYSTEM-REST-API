const db = require('../database')
const sequelize = require('sequelize')

const trainerInfo = db.define('trainerInfo', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    city: {
        type: sequelize.STRING,
        allowNull: true,
    },
    state: {
        type: sequelize.STRING,
    },
    salary: {
        type: sequelize.DOUBLE,
    },
    gender: {
        type: sequelize.STRING,
    },
    expert: {
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

module.exports = trainerInfo