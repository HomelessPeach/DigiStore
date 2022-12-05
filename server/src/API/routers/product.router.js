const {Router} = require("express");
const {ProductController} = require("../controllers/product.controller");

const routerProduct = Router()

routerProduct
    .post('/admin', ProductController.createProduct)
    .get('/admin', ProductController.listProduct)
    .get('/admin/:id', ProductController.showProduct)
    .put('/admin/:id', ProductController.updateProduct)
    .delete('/admin/:id', ProductController.deleteProduct)

module.exports = {routerProduct}