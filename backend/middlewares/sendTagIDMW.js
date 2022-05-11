const requireOption = require('./common').requireOption

module.exports = function (objectRepository) {
    return function(req, res, next) {
        req.body.time = new Date()
        return next()
    }
}