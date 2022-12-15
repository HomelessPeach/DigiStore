const {Router} = require("express");
const {ChatController} = require("../controllers/chat.controller");

const routerChat = Router()

routerChat
    .get('/admin', ChatController.listChat)
    .get('/admin/:id', ChatController.showChat)
    .post('/message', ChatController.createMessage)

module.exports = {routerChat}