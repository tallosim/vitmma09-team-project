const requireOption = require('./common').requireOption

module.exports = function (objectRepository, io) {
    const ItemStatusModel = requireOption(objectRepository, 'itemStatusModel')

    return function (req, res, next) {
        res.tpl.item.lastRead = {
            time: req.body.time,
            basket: res.tpl.basket._id
        }
        res.tpl.item.status = ItemStatusModel.InBasket

        res.tpl.item.save((err, result) => {
            if (err)
                return next({ code: 500, msg: 'Database error during saving.' })
            
            io.to(res.tpl.basket.socketID).emit('RDID_READ')

            console.log(`[express]: RFID tag read "${res.tpl.item.tagID}" from "${req.body.basketID}" basket.`)
            return res.json('Ok')  
        })
    }
}