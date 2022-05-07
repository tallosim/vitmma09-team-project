const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')

module.exports = function (objectrepository) {
    const ItemModel = requireOption(objectrepository, 'itemModel')

    return function (req, res, next) {
        ItemModel.findOne({ tagID: sanitize(req.body.tagID) }, (err, result) => {
            if (err || !result)
                return next({ code: 404, msg: 'Item not found with this tagID.' })

            res.tpl.item = result
            return next()
        })
    }
}