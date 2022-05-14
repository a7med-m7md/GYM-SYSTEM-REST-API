const express = require("express")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require("./database")
const clients = require('./model/client')
const infos = require('./model/info')
const sports = require('./model/sport')
const excercises = require('./model/excercise')
const trainers = require('./model/trainer')
const trainerInfos = require('./model/trainerInfo')
const memberships = require("./model/membership")
const payments = require("./model/payment")
const app = express()
const cors = require('cors')
const client = require('./Router/clientRouter')
const info = require('./Router/infoRouter')
const sport = require('./Router/sportRouter')
const excercise = require('./Router/excerciseRouter')
const trainer = require('./Router/trainerRoute')
const trainerInfo = require('./Router/trainerInfoRouter')
const payment = require("./Router/paymentRouter")
const membership = require('./Router/membershipRouter')

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))


app.use(bodyParser.json())
app.use(cookieParser())


clients.hasOne(infos)

infos.belongsTo(sports)

sports.hasMany(excercises)

trainers.hasOne(trainerInfos)

trainers.hasMany(infos)

clients.hasOne(memberships)

memberships.hasMany(payments)



const server = app.listen(4000)




db.sync().then((res) => console.log("Connected Successfully")).catch((err) => console.log(err))

app.use('/api/v1/users', client)
app.use('/api/v1/infos', info)
app.use('/api/v1/sports', sport)
app.use('/api/v1/excercises', excercise)
app.use('/api/v1/trainers', trainer)
app.use('/api/v1/trainerInfos', trainerInfo)
app.use('/api/v1/memberships', membership)
app.use('/api/v1/payments', payment)