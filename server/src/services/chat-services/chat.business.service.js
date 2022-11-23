const {ChatDatabaseService} = require("./chat.database.service");
const {ChatProcessService} = require("./chat.process.service");

class ChatBusinessService {

    static async createChatMessage() {
        return 1
    }

    static async listChatMessage(query) {
        const {chatSort} = ChatProcessService.chatDataList(query)
        const chats = await ChatDatabaseService.listChat(chatSort)
        const countChats = await ChatDatabaseService.countChat()
        return {chats, countChats}
    }

    static async showChatMessage(chatId) {
        return await ChatDatabaseService.showChat(chatId)
    }

    static async updateChatMessage() {
        return 1
    }

    static async deleteChatMessage(chatId) {
        return await ChatDatabaseService.deleteChat(chatId)
    }

}

module.exports = {ChatBusinessService}