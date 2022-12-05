const {Router} = require("express");
const {OrderController} = require("../controllers/order.controller");

const routerOrder = Router()

routerOrder
    .post('/admin', OrderController.createOrder)
    .get('/admin', OrderController.listOrder)
    .get('/admin/:id', OrderController.showOrder)
    .put('/admin/:id', OrderController.updateOrder)
    .delete('/admin/:id', OrderController.deleteOrder)

module.exports = {routerOrder}