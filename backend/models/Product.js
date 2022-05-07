
const Schema = require('mongoose').Schema
const db = require('../config/db')

const Product = db.model('products', {
    name: Schema.Types.String,
    description: Schema.Types.String,
    price: Schema.Types.Number
})

module.exports = Product