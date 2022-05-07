const Schema = require('mongoose').Schema
const db = require('../config/db')

const Reader = db.model('readers', {
    uuid: Schema.Types.String,
})

module.exports = Reader