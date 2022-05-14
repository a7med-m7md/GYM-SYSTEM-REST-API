const membership = require("../model/membership")
const payment = require("../model/payment")

const validCode = (code) => {
    const codes = { "21853898079920": 200, "86263483302944": 400, "45083597053272": 600 }
    return codes[code]
}

exports.pay = async (req, res, next) => {
    const { code } = req.body
    if (!validCode(code))
        return res.status(400).json({
            status: "Failed",
            message: "Invalid Code, Please try again with valid one!"
        })

    const amount = validCode(code)
    try {

        var mymembership = await membership.findOne({ where: { clientId: req.body.user.id } })
        if (!mymembership)
            mymembership = await membership.create({
                clientId: req.body.user.id,
            })

        await payment.create({
            amount,
            date: formatDate(0),
            method: "On Site",
            membershipId: mymembership.id,
        })

        //if (!mymembership.date)
        mymembership.date = formatDate(amount / 200)
        // else {
        //     const newDate = new Date()
        //     const previousMonth = parseInt(mymembership.date.split('-')[1]) - (newDate.getMonth() + 1)
        //     mymembership.date = formatDate((amount / 200) + previousMonth)
        // }

        await mymembership.save()
        res.status(200).json({
            status: "Success",
            message: `You update your membership with ${amount} EG`
        })
    }
    catch (err) {
        console.log(err)
    }

}


const formatDate = (months) => {
    var date = new Date()
    var today = new Date(date.setMonth(date.getMonth() + months));
    const month = (today.getMonth() + 1) > 10 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)
    const day = today.getDate() > 10 ? today.getDate() : "0" + today.getDate()
    return date.getFullYear() + '-' + month + '-' + day;
}