const {Router} = require("express");
const {ProductFeatureController} = require("../controllers/product-feature.controller");
const {AuthMiddleware} = require("../../middlewares/auth-middleware")

const routerProductFeature = Router()

routerProductFeature
    .post('/admin', AuthMiddleware, ProductFeatureController.createProductFeature)
    .get('/admin', AuthMiddleware, ProductFeatureController.listProductFeature)
    .get('/admin/:id', AuthMiddleware, ProductFeatureController.showProductFeature)
    .put('/admin/:id', AuthMiddleware, ProductFeatureController.updateProductFeature)
    .delete('/admin/:id', AuthMiddleware, ProductFeatureController.deleteProductFeature)

module.exports = {routerProductFeature}