
var Schema = require('mongoose').Schema
var db = require('../config/db')

var Product = db.model('products', {
    name: Schema.Types.String,
    description: Schema.Types.String,
    price: Schema.Types.Number
})

module.exports = Product