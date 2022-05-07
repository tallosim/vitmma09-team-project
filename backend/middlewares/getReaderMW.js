const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')

module.exports = function (objectrepository) {
    const ReaderModel = requireOption(objectrepository, 'rederModel')

    return function (req, res, next) {
        ReaderModel.findOne({ uuid: sanitize(req.body.deviceID) }, (err, result) => {
            if (err || !result)
                return next({ code: 404, msg: 'Reader not found with this deviceID.' })

            res.tpl.reader = result
            return next()
        })
    }
}