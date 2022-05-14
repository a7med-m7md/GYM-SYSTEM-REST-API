const trainer = require('../model/trainer')
const trainerInfo = require('../model/trainerInfo')
const jwt = require('jsonwebtoken')
const { promisify, inherits } = require('util')
const info = require('../model/info')

const signToken = (email) => {
    return jwt.sign({ email }, "gymsystem", { expiresIn: "5d" })
}

const createToken = (res, statusCode, trainer_) => {
    const token = signToken(trainer_.email)
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 100),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)
    trainer_.password = undefined
    res.status(statusCode).json({
        status: 'success',
        trainer: trainer_,
        token
    })
}

exports.getMe = async (req, res, next) => {
    try {
        const trainer_ = await trainer.findAll({
            where: { email: req.body.trainer.email },
            include: [{ model: trainerInfo, attributes: { exclude: ['trainerId', 'id'] } }],
            attributes: { exclude: ['password',] }, raw: true
        })
        res.status(200).json({
            status: 'success',
            trainer: trainer_[0],
        })
        next()
    }
    catch (err) {
        console.log(err)
    }
}

exports.getAllClients = async (req, res, next) => {
    const trainer_ = await trainer.findAll({ include: [{ model: info }], attributes: { exclude: ['password'] }, raw: true })
    res.status(200).json({
        status: 'success',
        result: clients.length,
        data: {
            trainers: trainer_
        },
    })
    next()
}


exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const trainer_ = await trainer.findAll({ where: { email }, raw: true })
        if (!trainer_ || trainer_[0].password != password) {
            return res.status(401).json({
                status: 'falied',
                message: 'The password or the email is incorrect'
            })
        }
        createToken(res, 200, trainer_[0])
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            message: "can't login with this trainer, It seems the email or password is invalid!"
        })
    }

}

exports.protected = async (req, res, next) => {
    try {
        let token = req.cookies.jwt
        console.log(token)
        if (!token)
            return res.status(401).json({
                status: 'failed',
                message: 'You can\'t show this page'
            })
        const decode = await promisify(jwt.verify)(token, "gymsystem")
        const trainer_ = await trainer.findAll({ where: { email: decode.email }, raw: true })
        req.body.trainer = trainer_[0]
        next()
    }
    catch (err) {
        return res.status(401).json({
            status: 'failed',
            message: 'You can\'t access this route'
        })
    }

}

exports.logOut = (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 20 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        status: 'success'
    })
}
