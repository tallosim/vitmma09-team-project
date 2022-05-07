const Schema = require('mongoose').Schema
const db = require('../config/db')

const Basket = db.model('baskets', {
    uuid: Schema.Types.String,
})

module.exports = Basket