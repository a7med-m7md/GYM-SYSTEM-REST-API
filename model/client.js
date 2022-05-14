const db = require('../database')
const sequelize = require('sequelize');

const client = db.define('client', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: sequelize.STRING,
    },
    birthDate: {
        type: sequelize.DATEONLY,
        validate: {
            isDate: true
        }
    },
    phone: {
        type: sequelize.STRING(15),
    },
    email: {
        type: sequelize.STRING(255),
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            isLongEnough() {
                if (this.password.length < 8) {
                    throw new Error('Password must be longer than 8 letters')
                }
            }
        }
    },
},
    {
        timestamps: false,
        // If don't want createdAt
        createdAt: false,
        // If don't want updatedAt
        updatedAt: false
    }
)

module.exports = client;