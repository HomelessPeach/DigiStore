const {Router} = require("express");
const {ProductCategoryController} = require("../controllers/product-category.controller");

const routerProductCategory = Router()

routerProductCategory
    .post('/admin', ProductCategoryController.createProductCategory)
    .get('/admin', ProductCategoryController.listProductCategory)
    .get('/admin/:id', ProductCategoryController.showProductCategory)
    .put('/admin/:id', ProductCategoryController.updateProductCategory)
    .delete('/admin/:id', ProductCategoryController.deleteProductCategory)

module.exports = {routerProductCategory}