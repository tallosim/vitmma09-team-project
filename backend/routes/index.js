const sendTagIDMW = require('../middlewares/sendTagIDMW')
const getItemMW = require('../middlewares/getItemMW')
const getReaderMW = require('../middlewares/getReaderMW')
const saveReadingsMW = require('../middlewares/saveReadingsMW')

const Item = require('../models/Item')
const Reader = require('../models/Reader')
const Product = require('../models/Product')

module.exports = (app) => {
    const objectRepository = {
        itemModel: Item,
        rederModel: Reader,
        productModel: Product
    }

    app.route('/api/sendTagID').post(
        sendTagIDMW(objectRepository),
        getItemMW(objectRepository),
        getReaderMW(objectRepository),
        saveReadingsMW(objectRepository)
    )
}