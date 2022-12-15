const {Router} = require("express");
const {NewsController} = require("../controllers/news.controller");
const multer = require("multer");

const routerNews = Router()
const middlewareMulter = multer();

routerNews
    .post('/admin', middlewareMulter.fields([{name: 'sourceImage'}]), NewsController.createNews)
    .get('/admin', NewsController.listNews)
    .get('/admin/:id', NewsController.showNews)
    .put('/admin/:id', middlewareMulter.fields([{name: 'sourceImage'}]), NewsController.updateNews)
    .delete('/admin/:id', NewsController.deleteNews)

module.exports = {routerNews}