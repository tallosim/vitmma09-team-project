const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')

module.exports = function (objectRepository) {
    const ItemModel = requireOption(objectRepository, 'itemModel')

    return function (req, res, next) {
        var tagID = null
        
        if (req.method === 'GET') {
            if (!req.params || !req.params.tagID)
                return next({code: 400, msg: 'Bad request params!'})
            
                tagID = req.params.tagID
        }

        if (req.method === 'POST') {
            if (!req.body || !req.body.tagID)
                return next({code: 400, msg: 'Bad request body!'})
            
                tagID = req.body.tagID
        }

        tagID = tagID.toUpperCase()

        ItemModel.findOne({ tagID: sanitize(tagID) }, (err, result) => {
            if (err)
                return next({ code: 500, msg: 'DB error!' })

            if (!result)
                return next({ code: 404, msg: `Item not found with the "${tagID}" tagID.` })


            res.tpl.item = result
            return next()
        })
    }
}