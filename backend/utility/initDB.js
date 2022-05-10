const mongoose = require('mongoose')

const Item = require('../models/Item')
const Basket = require('../models/Basket')
const Product = require('../models/Product')
const ItemStatus = require('../models/ItemStatus')

const makeEntity = (Model, props) => {
    let entity = Model()

    for (const key of Object.keys(props)) {
        entity[key] = props[key]
    }

    return entity
}

const tags = process.env.TAGS.split(' ')

let basket = Basket()
basket.uuid = 'ff23cb4d-57c9-4099-8cbf-30dd10d7cc4a'
basket.name = '#001'

basket.save((err, basketResult) => {
    if (err)
        return console.log(err)

    let product = Product()
    product.name = 'Test Product'
    product.description = 'This a very nice product'
    product.price = 1000

    product.save((err, productResult) => {
        if (err)
            return console.log(err)

        let items = tags
            .map(tag => ({ 
                lastRead: {}, 
                product: productResult._id, 
                tagID: tag, 
                status:  ItemStatus.InStock
            }))
            .map(item => makeEntity(Item, item))

        Item.collection.insertMany(items)
            .catch(err => console.log(err))
            .then(() => {
                mongoose.disconnect()
            })
    })
})
