import axios from 'axios'

import { handleResponse } from '../Helpers'

export const apiServices = {
    getProducts,
    checkOut
}

function getProducts (basketID) {
    return axios.get(`/api/listProductsInBasket/${basketID}`).then(handleResponse)
}

function checkOut(basketID) {
    return axios.get(`/api/checkOut`, { basketID }).then(handleResponse)
}