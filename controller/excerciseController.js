const excercise = require('../model/excercise')
const sport = require('../model/sport')



exports.getMyExcercise = async (req, res, next) => {
    try {
        const excercises = await excercise.findAll({ include: [{ model: sport }], raw: true })
        res.status(200).json({
            status: 'success',
            data: {
                excercises,
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'falied',
            message: 'can\'t reach the excercises'
        })
    }
}

exports.getAllExcercise = async (req, res, next) => {
    try {
        const excercises = await excercise.findAll({ raw: true })
        res.status(200).json({
            status: 'success',
            result: excercises.length,
            data: {
                excercises,
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'falied',
            message: 'can\'t reach the excercises'
        })
    }
}

exports.createNewExcercise = async (req, res, next) => {
    try {
        const excercises = await excercise.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                excercises,
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'falied',
            message: 'can\'t create the excercise'
        })
    }
}