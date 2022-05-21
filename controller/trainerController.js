const trainer = require('../model/trainer')
const trainerInfo = require('../model/trainerInfo')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
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

// GET ALL MY TRAINEEEEEEEEEEEEE
exports.getAllMyUsers = async (req, res, next) => {
    console.log(req.body)
    const users = await info.findAll({ where: { trainerId: req.body.trainer.id } });
    res.status(200).json({
        status: "success",
        result: users.length,
        users
    })
}


exports.editCurrentClient = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await info.findOne({ where: { id } })
        if (user.trainerId != req.body.trainer.id) {
            return res.status(401).json({
                status: "you can't do this operation",
                message: "This trainee isn't with you"
            })
        }
        // user.calories = req.body.calories
        user.dietPlan = req.body.dietPlan
        user.trainingPlan = req.body.trainingPlan
        user.progress = req.body.progress
        await user.save()

        res.status(200).json({
            status: "updated successfully",
            user
        })
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            message: "You can't do this operation"
        })
    }

}


exports.getAllTrainers = async (req, res, next) => {
    const trainers = await trainer.findAll();
    res.status(200).json({
        status: "success",
        result: trainers.length,
        trainers
    })
}

exports.getInfo = async (req, res, next) => {
    try {
        const { id } = req.params
        const myinfo = await info.findOne({ where: { id } })
        if (myinfo.trainerId != req.body.trainer.id) {
            return res.status(401).json({
                status: "you can't do this operation",
                message: "This trainee isn't with you"
            })
        }
        res.status(200).json({
            status: "success",
            info: {
                dietPlan: myinfo.dietPlan,
                trainingPlan: myinfo.trainingPlan,
                progress: myinfo.progress,
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: "Falied",
            message: "Can't do this operation on this client!"
        })
    }

}







