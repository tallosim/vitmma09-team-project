var Schema = require('mongoose').Schema
var db = require('../config/db')

var Reader = db.model('readers', {
    uuid: Schema.Types.String,
})

module.exports = Reader