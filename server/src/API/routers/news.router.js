const {Router} = require("express");
const {NewsController} = require("../controllers/news.controller");
const {AuthMiddleware} = require("../../middlewares/auth-middleware")
const multer = require("multer");

const routerNews = Router()
const middlewareMulter = multer();

routerNews
    .post('/admin', AuthMiddleware, middlewareMulter.fields([{name: 'sourceImage'}]), NewsController.createNews)
    .get('/admin', AuthMiddleware, NewsController.listNews)
    .get('/admin/:id', AuthMiddleware, NewsController.showNews)
    .put('/admin/:id', AuthMiddleware, middlewareMulter.fields([{name: 'sourceImage'}]), NewsController.updateNews)
    .delete('/admin/:id', AuthMiddleware, NewsController.deleteNews)
    .get('/', NewsController.getAllNews)
    .get('/:id', NewsController.getNews)

module.exports = {routerNews}