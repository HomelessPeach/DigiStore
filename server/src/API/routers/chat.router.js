const {Router} = require("express");
const {ChatController} = require("../controllers/chat.controller");
const {AuthMiddleware} = require("../../middlewares/auth-middleware")

const routerChat = Router()

routerChat
    .get('/admin', AuthMiddleware, ChatController.listChat)
    .get('/admin/:id', AuthMiddleware, ChatController.showChat)
    .post('/create', AuthMiddleware, ChatController.createChat)
    .post('/message', AuthMiddleware, ChatController.createMessage)
    .get('/:user', AuthMiddleware, ChatController.getUserChat)

module.exports = {routerChat}