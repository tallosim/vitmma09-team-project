const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')

module.exports = function (objectrepository) {
    const BasketModel = requireOption(objectrepository, 'rederModel')

    return function (req, res, next) {
        BasketModel.findOne({ uuid: sanitize(req.body.deviceID) }, (err, result) => {
            if (err || !result)
                return next({ code: 404, msg: 'Basket not found with this deviceID.' })

            res.tpl.basket = result
            return next()
        })
    }
}