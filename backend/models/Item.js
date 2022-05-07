const Schema = require('mongoose').Schema
const db = require('../config/db')

const Item = db.model('items', {
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
    tagID: Schema.Types.String,
    status: Schema.Types.String
})

module.exports = Item