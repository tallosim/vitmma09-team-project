const Schema = require('mongoose').Schema
const db = require('../config/db')

const Basket = db.model('baskets', {
    uuid: Schema.Types.String,
    name: Schema.Types.String,
    socketID: Schema.Types.String,
    isActive: Schema.Types.Boolean
})

module.exports = Basket