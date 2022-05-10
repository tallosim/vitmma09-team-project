const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')
const mongoose = require('mongoose')

module.exports = function (objectrepository) {
    const ItemModel = requireOption(objectrepository, 'itemModel')
    const ItemStatusModel = requireOption(objectrepository, 'itemStatusModel')

    return function (req, res, next) {
        if (!res.tpl || !res.tpl.basket)
            return next({ code: 500 })

        ItemModel.find({ 'lastRead.basket': res.tpl.basket, status: ItemStatusModel.InBasket }, (err, result) => {
            if (err)
                return next({ code: 500, msg: 'DB error!' })

            if (result.length === 0) {
                const resObject = {
                    basket: {
                        basketID: res.tpl.basket.uuid,
                        name: res.tpl.basket.name
                    },
                    products: []
                }
                return res.send(resObject)
            }

            res.tpl.items = result
            res.tpl.productIDs = result
                .map(item => item.product._id.toString())
                .filter((value, index, self) => self.indexOf(value) === index) //unique values
                .map(product => mongoose.Types.ObjectId(product))

            return next()
        })
    }
}