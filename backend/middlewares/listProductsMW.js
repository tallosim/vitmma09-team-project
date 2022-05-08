const requireOption = require('./common').requireOption
const sanitize = require('mongo-sanitize')

module.exports = function (objectrepository) {
    return function (req, res, next) {
        var products = JSON.parse(JSON.stringify(res.tpl.products))

        products.forEach(product => {
            product.items = res.tpl.items
                .filter(item => item.product._id.toString() === product._id)
                .map(item => ({
                    lastReadTime: item.lastRead.time,
                    tagID: item.tagID,
                    status: item.status
                }))
        })

        products = products
            .map(product => ({
                name: product.name,
                description: product.description,
                price: product.price,
                items: product.items
            }))

        return res.send(products)
    }
}