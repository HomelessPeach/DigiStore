const {Router} = require("express");
const {ProductCategoryController} = require("../controllers/product-category.controller");
const multer = require("multer");

const routerProductCategory = Router()
const middlewareMulter = multer();

routerProductCategory
    .post('/admin', middlewareMulter.fields([{name: 'sourceImage'}]), ProductCategoryController.createProductCategory)
    .get('/admin', ProductCategoryController.listProductCategory)
    .get('/admin/:id', ProductCategoryController.showProductCategory)
    .put('/admin/:id', middlewareMulter.fields([{name: 'sourceImage'}]), ProductCategoryController.updateProductCategory)
    .delete('/admin/:id', ProductCategoryController.deleteProductCategory)

module.exports = {routerProductCategory}