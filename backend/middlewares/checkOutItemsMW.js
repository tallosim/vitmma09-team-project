const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')
const mongoose = require('mongoose')

module.exports = function (objectRepository) {
    const ItemModel = requireOption(objectRepository, 'itemModel')
    const ItemStatusModel = requireOption(objectRepository, 'itemStatusModel')

    return function (req, res, next) {
        if (!res.tpl || !res.tpl.items)
            return next({ code: 500 })

        const items = res.tpl.items.map(item => item._id)

        ItemModel.updateMany({ _id: { $in: items } }, { status: ItemStatusModel.Sold }, (err, result) => {
            if (err)
                return next({ code: 500, msg: 'DB error!' })

            console.log(`[express]: "${req.body.basketID}" basket cleared.`)
            return res.json('Ok')
        })

    }
}