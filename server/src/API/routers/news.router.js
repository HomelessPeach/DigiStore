const {Router} = require("express");
const {NewsController} = require("../controllers/news.controller");

const routerNews = Router()

routerNews
    .post('/admin', NewsController.createNews)
    .get('/admin', NewsController.listNews)
    .get('/admin/:id', NewsController.showNews)
    .put('/admin/:id', NewsController.updateNews)
    .delete('/admin/:id', NewsController.deleteNews)

module.exports = {routerNews}