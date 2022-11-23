const {Router} = require("express");
const {ProductController} = require("../controllers/product.controller");

const routerProduct = Router()

routerProduct
    .post('/create', ProductController.createProduct)
    .get('/list', ProductController.listProduct)
    .get('/show/:id', ProductController.showProduct)
    .put('/update/:id', ProductController.updateProduct)
    .delete('/delete/:id', ProductController.deleteProduct)

module.exports = {routerProduct}