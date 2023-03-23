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
    .get('/carousel', ProductController.getProductsForCarousel)
    .get('/', ProductController.getProducts)
    .post('/:id/review', ProductController.createReview)
    .put('/:id/review/:review', ProductController.updateReview)
    .delete('/:id/review/:review', ProductController.deleteReview)
    .get('/:id/review', ProductController.getProductReviews)
    .get('/:id/review/:user', ProductController.getProductReview)
    .get('/:id', ProductController.getProduct)


module.exports = {routerProduct}