const { Server } = require('socket.io')
const sanitize = require('mongo-sanitize')
const dotenv = require('dotenv')

const requireOption = require('../middlewares/common').requireOption

const Item = require('../models/Item')
const Basket = require('../models/Basket')
const Product = require('../models/Product')
const ItemStatus = require('../models/ItemStatus')

dotenv.config()

module.exports = (app) => {
    const objectRepository = {
        itemModel: Item,
        itemStatusModel: ItemStatus,
        basketModel: Basket,
        productModel: Product
    }

    var io = new Server(process.env.SOCKET_PORT || 4220, {
        cors: {
            origin: process.env.ORIGIN_URL || 'http://localhost:3000'
        }
    })
    app.io = io

    const BasketModel = requireOption(objectRepository, 'basketModel')

    io.on('connection', (socket) => {
        console.log(`[socket.io]: Client connected with "${socket.id}" socketID.`)

        socket.on('pair', (basketID) => {
            console.log(`[socket.io]: Client paired the socket with "${socket.id}" socketID and "${basketID}" basketID.`)
            BasketModel.findOne({ uuid: sanitize(basketID) }, (err, basket) => {
                if (err)
                    return console.log({ code: 500, msg: '[socket.io]: DB socket error!' })
                
                if (!basket)
                    return console.log({ code: 404, msg: '[socket.io]: Basket not found with the given basketID.' })

                basket.socketID = socket.id
                basket.isActive = true
                basket.save()
            })
        })

        socket.on('dispair', () => {
            console.log(`[socket.io]: Client dispaired the socket with "${socket.id}" socketID.`)
            BasketModel.findOne({ socketID: sanitize(socket.id) }, (err, basket) => {
                if (err)
                    return console.log({ code: 500, msg: '[socket.io]: DB socket error!' })
                
                if (!basket)
                    return console.log({ code: 404, msg: '[socket.io]: Basket not found with the given socketID.' })

                basket.socketID = ''
                basket.isActive = false
                basket.save()
            })
        })

        socket.on('disconnect', (reason) => {
            console.log(`[socket.io]: Client disconnected with "${socket.id}" socketID due to ${reason}.`)
            BasketModel.findOne({ socketID: sanitize(socket.id) }, (err, basket) => {
                if (err)
                    return console.log({ code: 500, msg: '[socket.io]: DB socket error!' })
                
                if (!basket)
                    return console.log({ code: 404, msg: '[socket.io]: Basket not found with the given socketID.' })

                basket.socketID = ''
                basket.isActive = false
                basket.save()
            })
        })
    })
}