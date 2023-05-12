const {Router} = require("express");
const {OrderController} = require("../controllers/order.controller");
const {AuthMiddleware} = require("../../middlewares/auth-middleware")

const routerOrder = Router()

routerOrder
    .post('/add', OrderController.addOrder)
    .get('/admin', AuthMiddleware, OrderController.listOrder)
    .get('/admin/:id', AuthMiddleware, OrderController.showOrder)
    .put('/cancel/:id', AuthMiddleware, OrderController.cancelOrder)
    .put('/complete/:id', AuthMiddleware, OrderController.completeOrder)

module.exports = {routerOrder}