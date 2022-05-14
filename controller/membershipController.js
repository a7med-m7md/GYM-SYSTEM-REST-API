const membership = require('../model/membership')


exports.getMembership = async (req, res, next) => {
    try {
        const mymembership = await membership.findOne({ where: { clientId: req.body.user.id }, raw: true })
        const isActive = new Date(mymembership.date) > new Date() ? "true" : "false"
        res.status(200).json({
            status: "success",
            data: {
                active: isActive,
                renewAt: mymembership.date
            }
        })
    }
    catch (err) {
        console.log(err)
    }

}