const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')

module.exports = function (objectRepository) {
    const ProductModel = requireOption(objectRepository, 'productModel')

    return function (req, res, next) {
        if (!res.tpl || !res.tpl.productIDs)
            return next({ code: 500 })

        ProductModel.find({ _id: { $in: res.tpl.productIDs } }, (err, result) => {
            if (err)
                return next({ code: 500, msg: 'DB error!' })

            res.tpl.products = result
            return next()
        })
    }
}