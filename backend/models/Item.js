var Schema = require('mongoose').Schema
var db = require('../config/db')

var Item = db.model('items', {
    lastRead: {
        time: Schema.Types.Date,
        reader: {
            type: Schema.Types.ObjectId,
            ref: 'readers'
        }
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    tagID: Schema.Types.String
})

module.exports = Item