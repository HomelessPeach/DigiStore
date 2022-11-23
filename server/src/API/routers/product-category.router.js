const {Router} = require("express");
const {ProductCategoryController} = require("../controllers/product-category.controller");

const routerProductCategory = Router()

routerProductCategory
    .post('/', ProductCategoryController.createProductCategory)
    .get('/', ProductCategoryController.listProductCategory)
    .get('/:id', ProductCategoryController.showProductCategory)
    .put('/:id', ProductCategoryController.updateProductCategory)
    .delete('/:id', ProductCategoryController.deleteProductCategory)

module.exports = {routerProductCategory}