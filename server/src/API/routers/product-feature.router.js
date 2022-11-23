const {Router} = require("express");
const {ProductFeatureController} = require("../controllers/product-feature.controller");

const routerProductFuture = Router()

routerProductFuture
    .post('/create', ProductFeatureController.createProductFeature)
    .get('/list', ProductFeatureController.listProductFeature)
    .get('/show/:id', ProductFeatureController.showProductFeature)
    .put('/update/:id', ProductFeatureController.updateProductFeature)
    .delete('/delete/:id', ProductFeatureController.deleteProductFeature)

module.exports = {routerProductFuture}