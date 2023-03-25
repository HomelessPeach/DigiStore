const {ChatDatabaseService} = require("./chat.database.service");
const {ChatProcessService} = require("./chat.process.service");

class ChatBusinessService {

    static async createChat(body, transaction) {
        const {chatData} = ChatProcessService.chatDataWrite(body)
        return await ChatDatabaseService.createChat(chatData, transaction)
    }

    static async getUserChat(userId) {
        return await ChatDatabaseService.getUserChat(userId)
    }

    static async listChat(query) {
        const {chatSort} = ChatProcessService.chatDataList(query)
        const chats = await ChatDatabaseService.listChat(chatSort)
        const countChats = await ChatDatabaseService.countChat()
        return {chats, countChats}
    }

    static async showChat(chatId) {
        return await ChatDatabaseService.showChat(chatId)
    }

    static async createMessage(body, transaction) {
        const {chatMessageData} = ChatProcessService.chatMessageDataWrite(body)
        await ChatDatabaseService.updateChatStatus(!chatMessageData.is_user, chatMessageData.fk_chat, transaction)
        return await ChatDatabaseService.createMessage(chatMessageData, transaction)
    }
}

module.exports = {ChatBusinessService}