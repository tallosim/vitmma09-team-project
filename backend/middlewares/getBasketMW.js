const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')

module.exports = function (objectrepository) {
    const BasketModel = requireOption(objectrepository, 'basketModel')

    return function (req, res, next) {
        var basketID = null
        
        if (req.method === 'GET') {
            if (!req.params || !req.params.basketID)
                return next({code: 400, msg: 'Bad request params!'})
            
            basketID = req.params.basketID
        }

        if (req.method === 'POST') {
            if (!req.body || !req.body.basketID)
                return next({code: 400, msg: 'Bad request body!'})
            
            basketID = req.body.basketID
        }

        BasketModel.findOne({ uuid: sanitize(basketID) }, (err, result) => {
            if (err)
                return next({ code: 500, msg: 'DB error!' })

            if (!result)
                return next({ code: 404, msg: 'Basket not found with the given basketID.' })

            res.tpl.basket = result
            return next()
        })
    }
}