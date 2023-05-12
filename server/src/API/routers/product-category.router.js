const {Router} = require("express");
const {ProductCategoryController} = require("../controllers/product-category.controller");
const {AuthMiddleware} = require("../../middlewares/auth-middleware")
const multer = require("multer");

const routerProductCategory = Router()
const middlewareMulter = multer();

routerProductCategory
    .post('/admin', AuthMiddleware, middlewareMulter.fields([{name: 'sourceImage'}]), ProductCategoryController.createProductCategory)
    .get('/admin', AuthMiddleware, ProductCategoryController.listProductCategory)
    .get('/admin/:id', AuthMiddleware, ProductCategoryController.showProductCategory)
    .put('/admin/:id', AuthMiddleware, middlewareMulter.fields([{name: 'sourceImage'}]), ProductCategoryController.updateProductCategory)
    .delete('/admin/:id', AuthMiddleware, ProductCategoryController.deleteProductCategory)
    .get('/', ProductCategoryController.getProductCategories)
    .get('/:id', ProductCategoryController.getProductCategoryName)

module.exports = {routerProductCategory}