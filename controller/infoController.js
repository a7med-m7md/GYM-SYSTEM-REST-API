const info = require('../model/info')
const membership = require('../model/membership')

exports.getMyInfo = async (req, res, next) => {
    try {
        const infos = await info.findAll({ raw: true })
        res.status(200).json({
            status: 'success',
            infos
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.createMyInfo = async (req, res, next) => {
    try {
        const currentInfo = await info.findOne({ where: { id: req.body.user.id } })
        let infos;
        if (!currentInfo) {
            infos = await info.create({ ...req.body, clientId: req.body.user.id })
            await membership.create({
                clientId: req.body.user.id,
            })
        }
        else {
            for (const [key, value] of Object.entries(req.body)) {
                if (typeof value != Object)
                    currentInfo[key] = value
            }
            await currentInfo.save()
            infos = currentInfo
        }
        res.status(201).json({
            statua: 'success',
            infos
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'falied',
            message: 'can\'t create info about you'
        })
    }

}
