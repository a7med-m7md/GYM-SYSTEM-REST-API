const trainerInfo = require('../model/trainerInfo')

exports.getMyInfo = async (req, res, next) => {
    try {
        const infos = await trainerInfo.findOne({ where: { clientId: req.body.trainer.id } }, { raw: true })
        res.status(200).json({
            status: 'success',
            infos
        })
    }
    catch (err) {
        console.log(err)
    }
    next()
}


exports.createMyInfo = async (req, res, next) => {
    try {
        const currentInfo = await trainerInfo.findOne({ where: { trainerId: req.body.trainer.id } })
        let infos;
        if (!currentInfo)
            infos = await trainerInfo.create(req.body)
        else {
            for (const [key, value] of Object.entries(req.body)) {
                console.log(req.body)
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