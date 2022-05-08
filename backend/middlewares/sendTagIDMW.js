const requireOption = require('./common').requireOption

module.exports = function (objectrepository) {
    return function(req, res, next) {
        req.body.time = new Date()
        return next()
    }
}