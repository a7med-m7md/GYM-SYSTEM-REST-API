const db = require('../database')
const sequelize = require('sequelize')

const info = db.define('info', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    // We can extract it from client table
    age: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    weight: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    goal: {
        type: sequelize.STRING(45),
    },
    heigth: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    calories: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    dietPlan: {
        type: sequelize.STRING,
    },
    trainingPlan: {
        type: sequelize.STRING,
    },
    progress: {
        type: sequelize.STRING,
    },
}, {
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false
})

module.exports = info