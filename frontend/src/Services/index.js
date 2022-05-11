import axios from 'axios'
import { io } from 'socket.io-client'

import { handleResponse } from '../Helpers'

const SOCKET_URL = process.env.SOCKET_URL ||'http://localhost:4220'

export const apiServices = {
    getProducts,
    checkOut
}

function getProducts(basketID) {
    return axios.get(`/api/listProductsInBasket/${basketID}`).then(handleResponse)
}

function checkOut(basketID) {
    return axios.post(`/api/checkOut`, { basketID }).then(handleResponse)
}

export const socketService = {
    connectSocket,
    pairSocket,
    listenSocket,
    dispairSocket
}

function connectSocket() {
    this.socket = io(SOCKET_URL)
}

function pairSocket(basketID) {
    this.socket.emit('pair', basketID)
}

function listenSocket(eventName, callback) {
    this.socket.on(eventName, (data) => callback(data))
}

function dispairSocket() {
    this.socket.emit('dispair')
    this.socket.off()
}