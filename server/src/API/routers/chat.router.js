const {Router} = require("express");
const {ChatMessageController} = require("../controllers/chat.controller");

const routerChat = Router()

routerChat
    .get('/admin', ChatMessageController.listChat)
    .get('/admin/:id', ChatMessageController.showChat)
module.exports = {routerChat}