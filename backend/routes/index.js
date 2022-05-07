const sendTagIDMW = require('../middlewares/sendTagIDMW')
const getItemMW = require('../middlewares/getItemMW')
const getBasketMW = require('../middlewares/getBasketMW')
const saveReadingsMW = require('../middlewares/saveReadingsMW')

const Item = require('../models/Item')
const Basket = require('../models/Basket')
const Product = require('../models/Product')

module.exports = (app) => {
    const objectRepository = {
        itemModel: Item,
        rederModel: Basket,
        productModel: Product
    }

    app.route('/api/sendTagID').post(
        sendTagIDMW(objectRepository),
        getItemMW(objectRepository),
        getBasketMW(objectRepository),
        saveReadingsMW(objectRepository)
    )
}