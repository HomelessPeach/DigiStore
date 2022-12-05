const {Router} = require("express");
const {ProductFeatureController} = require("../controllers/product-feature.controller");

const routerProductFeature = Router()

routerProductFeature
    .post('/admin', ProductFeatureController.createProductFeature)
    .get('/admin', ProductFeatureController.listProductFeature)
    .get('/admin/:id', ProductFeatureController.showProductFeature)
    .put('/admin/:id', ProductFeatureController.updateProductFeature)
    .delete('/admin/:id', ProductFeatureController.deleteProductFeature)

module.exports = {routerProductFeature}