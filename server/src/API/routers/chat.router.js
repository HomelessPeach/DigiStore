const {Router} = require("express");
const {ChatController} = require("../controllers/chat.controller");

const routerChat = Router()

routerChat
    .get('/admin', ChatController.listChat)
    .get('/admin/:id', ChatController.showChat)
    .post('/create', ChatController.createChat)
    .post('/message', ChatController.createMessage)
    .get('/:user', ChatController.getUserChat)

module.exports = {routerChat}