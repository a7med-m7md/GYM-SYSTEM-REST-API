const db = require('../database')
const sequelize = require('sequelize')

const trainer = db.define('trainer', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
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

module.exports = trainer