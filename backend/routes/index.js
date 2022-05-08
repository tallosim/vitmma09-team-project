const sendTagIDMW = require('../middlewares/sendTagIDMW')
const getItemMW = require('../middlewares/getItemMW')
const getBasketMW = require('../middlewares/getBasketMW')
const getItemsInBasketMW = require('../middlewares/getItemsInBasketMW')
const saveReadingsMW = require('../middlewares/saveReadingsMW')
const getProductsMW = require('../middlewares/getProductsMW')
const listProductsMW = require('../middlewares/listProductsMW')

const Item = require('../models/Item')
const Basket = require('../models/Basket')
const Product = require('../models/Product')

module.exports = (app) => {
    const objectRepository = {
        itemModel: Item,
        basketModel: Basket,
        productModel: Product
    }

    app.route('/api/listProductsInBasket/:basketID').get(
        getBasketMW(objectRepository),
        getItemsInBasketMW(objectRepository),
        getProductsMW(objectRepository),
        listProductsMW(objectRepository)
    )

    app.route('/api/sendTagID').post(
        sendTagIDMW(objectRepository),
        getItemMW(objectRepository),
        getBasketMW(objectRepository),
        saveReadingsMW(objectRepository)
    )
}