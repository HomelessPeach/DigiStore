const {Router} = require("express");
const {NewsController} = require("../controllers/news.controller");

const routerNews = Router()

routerNews
    .post('/create', NewsController.createNews)
    .get('/list', NewsController.listNews)
    .get('/show/:id', NewsController.showNews)
    .put('/update/:id', NewsController.updateNews)
    .delete('/delete/:id', NewsController.deleteNews)

module.exports = {routerNews}