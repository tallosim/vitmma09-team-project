const requireOption = require('./common').requireOption

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.tpl.item.lastRead = {
            time: req.body.time,
            basket: res.tpl.basket._id
        }

        res.tpl.item.save((err, result) => {
            if (err)
                return next({ code: 500, msg: 'Database error during saving.' })
            
            console.log(`RFID data recived from "${req.body.deviceID}" basket.`)
            return res.status(200).send()  
        })
    }
}