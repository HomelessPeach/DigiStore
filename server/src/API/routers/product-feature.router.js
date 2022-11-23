const {Router} = require("express");
const {ProductFeatureController} = require("../controllers/product-feature.controller");

const routerProductFeature = Router()

routerProductFeature
    .post('/create', ProductFeatureController.createProductFeature)
    .get('/list', ProductFeatureController.listProductFeature)
    .get('/show/:id', ProductFeatureController.showProductFeature)
    .put('/update/:id', ProductFeatureController.updateProductFeature)
    .delete('/delete/:id', ProductFeatureController.deleteProductFeature)

module.exports = {routerProductFeature}