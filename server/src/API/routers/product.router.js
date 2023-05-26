const {Router} = require("express");
const {ProductController} = require("../controllers/product.controller");
const {AuthMiddleware} = require("../../middlewares/auth-middleware")
const multer = require("multer");

const routerProduct = Router()
const middlewareMulter = multer();

routerProduct
    .post('/admin', AuthMiddleware, middlewareMulter.fields([{name: 'sourceImage'}, {name: 'previewSourceImage'}]), ProductController.createProduct)
    .get('/admin', AuthMiddleware, ProductController.listProduct)
    .get('/admin/:id', AuthMiddleware, ProductController.showProduct)
    .put('/admin/:id', AuthMiddleware, middlewareMulter.fields([{name: 'sourceImage'}, {name: 'previewSourceImage'}]), ProductController.updateProduct)
    .delete('/admin/:id', AuthMiddleware, ProductController.deleteProduct)
    .get('/carousel', ProductController.getProductsForCarousel)
    .get('/products-by-id', ProductController.getProductsById)
    .get('/', ProductController.getProducts)
    .post('/:id/review', AuthMiddleware, ProductController.createReview)
    .put('/:id/review/:review', AuthMiddleware, ProductController.updateReview)
    .delete('/:id/review/:review', AuthMiddleware, ProductController.deleteReview)
    .get('/:id/review', ProductController.getProductReviews)
    .get('/:id/review/:user', AuthMiddleware, ProductController.getProductReview)
    .get('/:id', ProductController.getProduct)


module.exports = {routerProduct}