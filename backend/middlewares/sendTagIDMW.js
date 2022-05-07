const requireOption = require('./common').requireOption

module.exports = function (objectrepository) {
    return function(req, res, next) {
        if (!req.body)
            return next({code: 400, msg: 'No request body!'})

        if (!req.body.deviceID || !req.body.tagID)
            return next({code: 400, msg: 'Bad request body!'})

        req.body.time = new Date()
        return next()
    }
}