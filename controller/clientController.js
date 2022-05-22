const client = require('../model/client')
const jwt = require('jsonwebtoken')
const { promisify, inherits } = require('util')
const info = require('../model/info')
const sport = require('../model/sport')

const signToken = (email) => {
    return jwt.sign({ email }, "gymsystem", { expiresIn: "5d" })
}

const createToken = (res, statusCode, user) => {
    const token = signToken(user.email)
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 100),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)
    user.password = undefined
    res.status(statusCode).json({
        status: 'success',
        user,
        token
    })
}


exports.getMe = async (req, res, next) => {
    try {
        console.log(req.user)
        const client_ = await client.findOne({
            where: { email: req.body.user.email },
            include: [{ model: info, attributes: { exclude: ['id', 'sportId', 'clientId', 'trainerId'] } }],
            attributes: { exclude: ['password'] }, raw: true
        })
        res.status(200).json({
            status: 'success',
            client: client_,
        })
        next()
    }
    catch (err) {
        console.log(err)
    }
}

exports.getAllClients = async (req, res, next) => {
    const clients = await client.findAll({ include: [{ model: info }], attributes: { exclude: ['password'] }, raw: true })
    res.status(200).json({
        status: 'success',
        result: clients.length,
        data: {
            clients
        },
    })
    next()
}


exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await client.findAll({ where: { email }, raw: true })
        if (!user || user[0].password != password) {
            return res.status(401).json({
                status: 'falied',
                message: 'The password or the email is incorrect'
            })
        }
        createToken(res, 200, user[0])
    } catch (err) {
        return res.status(401).json({
            status: 'falied',
            message: 'The password or the email is incorrect'
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
        const user = await client.findAll({ where: { email: decode.email }, raw: true })
        req.body.user = user[0]
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

exports.signup = async (req, res, next) => {
    //const {firstName, lastName, gender, birthDate, phone, email, password} = req.body;
    try {
        const newUser = await client.create(req.body)
        createToken(res, 201, newUser)
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: "can't create this user, It seems the email attached to this user already exists"
        })
    }
}
