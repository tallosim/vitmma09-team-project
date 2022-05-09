const requireOption = require('./common').requireOption

module.exports = function (objectrepository) {
    const ItemStatusModel = requireOption(objectrepository, 'itemStatusModel')

    return function (req, res, next) {
        res.tpl.item.lastRead = {
            time: req.body.time,
            basket: res.tpl.basket._id
        }
        res.tpl.item.status = ItemStatusModel.InBasket

        res.tpl.item.save((err, result) => {
            if (err)
                return next({ code: 500, msg: 'Database error during saving.' })
            
            console.log(`RFID tag readed "${res.tpl.item.tagID}" from "${req.body.basketID}" basket.`)
            return res.json('Ok')  
        })
    }
}