const excercise = require('../model/excercise')
const info = require('../model/info')
const sport = require('../model/sport')


exports.getMySports = async (req, res, next) => {
    try {
        const sportId = await info.findAll({ where: { clientId: req.body.user.id }, raw: true })
        const sports = await sport.findAll({
            where: { id: sportId[0].sportId },
            include: [{ model: excercise, attributes: ['name'] }],
            attributes: ['name']
        })

        res.status(200).json({
            status: 'success',
            sports,
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'falied',
            message: 'can\'t reach the sports'
        })
    }
}


exports.getAllSports = async (req, res, next) => {
    try {
        const sports = await sport.findAll({ raw: true })
        res.status(200).json({
            status: 'success',
            result: sports.length,
            data: {
                sports,
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'falied',
            message: 'can\'t reach the sports'
        })
    }
}

exports.createNewSport = async (req, res, next) => {
    try {
        const sports = await sport.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                sports,
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'falied',
            message: 'can\'t create the sport'
        })
    }
}