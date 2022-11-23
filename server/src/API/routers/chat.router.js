const {Router} = require("express");
const {ChatMessageController} = require("../controllers/chat.controller");

const routerChat = Router()

routerChat
    .get('/list', ChatMessageController.listChat)
    .get('/show/:id', ChatMessageController.showChat)
module.exports = {routerChat}