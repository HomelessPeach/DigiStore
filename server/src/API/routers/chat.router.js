const {Router} = require("express");
const {ChatMessageController} = require("../controllers/chat.controller");

const routerChat = Router()

routerChat
    .post('/create', ChatMessageController.createChatMessage)
    .get('/list', ChatMessageController.listChatMessage)
    .get('/show/:id', ChatMessageController.showChatMessage)
    .put('/update/:id', ChatMessageController.updateChatMessage)
    .delete('/delete/:id', ChatMessageController.deleteChatMessage)

module.exports = {routerChat}