const {Router} = require("express");
const {ProductController} = require("../controllers/product.controller");
const multer = require("multer");

const routerProduct = Router()
const middlewareMulter = multer();

routerProduct
    .post('/admin', middlewareMulter.fields([{name: 'sourceImage'}, {name: 'previewSourceImage'}]), ProductController.createProduct)
    .get('/admin', ProductController.listProduct)
    .get('/admin/:id', ProductController.showProduct)
    .put('/admin/:id', middlewareMulter.fields([{name: 'sourceImage'}, {name: 'previewSourceImage'}]), ProductController.updateProduct)
    .delete('/admin/:id', ProductController.deleteProduct)
    .get('/', ProductController.getProducts)
    .get('/carousel', ProductController.getProductsForCarousel)
    .get('/:id', ProductController.getProduct)

module.exports = {routerProduct}