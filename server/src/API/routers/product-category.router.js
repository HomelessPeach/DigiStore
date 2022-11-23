const {Router} = require("express");
const {ProductCategoryController} = require("../controllers/product-category.controller");

const routerProductCategory = Router()

routerProductCategory
    .post('/create', ProductCategoryController.createProductCategory)
    .get('/list', ProductCategoryController.listProductCategory)
    .get('/show/:id', ProductCategoryController.showProductCategory)
    .put('/update/:id', ProductCategoryController.updateProductCategory)
    .delete('/delete/:id', ProductCategoryController.deleteProductCategory)

module.exports = {routerProductCategory}