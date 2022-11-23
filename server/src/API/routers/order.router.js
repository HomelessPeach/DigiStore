const {Router} = require("express");
const {OrderController} = require("../controllers/order.controller");

const routerOrder = Router()

routerOrder
    .post('/create', OrderController.createOrder)
    .get('/list', OrderController.listOrder)
    .get('/show/:id', OrderController.showOrder)
    .put('/update/:id', OrderController.updateOrder)
    .delete('/delete/:id', OrderController.deleteOrder)

module.exports = {routerOrder}