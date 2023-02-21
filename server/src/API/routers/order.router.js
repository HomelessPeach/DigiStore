const {Router} = require("express");
const {OrderController} = require("../controllers/order.controller");

const routerOrder = Router()

routerOrder
    .post('/add', OrderController.addOrder)
    .get('/admin', OrderController.listOrder)
    .get('/admin/:id', OrderController.showOrder)
    .put('/cancel/:id', OrderController.cancelOrder)
    .put('/complete/:id', OrderController.completeOrder)

module.exports = {routerOrder}