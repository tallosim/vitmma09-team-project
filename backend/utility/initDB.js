const mongoose = require('mongoose')

const Item = require('../models/Item')
const Reader = require('../models/Reader')
const Product = require('../models/Product')


const makeEntity = (Model, props) => {
    let entity = Model()

    for (const key of Object.keys(props)) {
        entity[key] = props[key]
    }

    return entity
}

const tags = [
    '06E1A959',
    '06E1A960'
]

let reader = Reader()
reader.uuid = 'ff23cb4d-57c9-4099-8cbf-30dd10d7cc4a'

reader.save((err, readerResult) => {
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
            .map(tag => ({ lastRead: {}, product: productResult._id, tagID: tag }))
            .map(item => makeEntity(Item, item))

        Item.collection.insertMany(items)
            .catch(err => console.log(err))
            .then(() => {
                mongoose.disconnect()
            })
    })
})
