const mongoose = require('mongoose')

const Item = require('../models/Item')
const Reader = require('../models/Reader')
const Product = require('../models/Product')

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

        let item = Item()
        item.lastRead = {}
        item.product = productResult._id
        item.tagID = '06E1A959'

        item.save((err, itemResult) => {
            if (err)
                return console.log(err)

            mongoose.disconnect()
        })
    })
})
