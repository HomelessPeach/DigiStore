const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {chat} = initModels(SequelizeConnect)

class ChatDatabaseService {

    static async createChat(chatData, transaction) {
        return chat.create(
            chatData, {
                transaction: transaction
            })
    }

    static async listChat(chatSort, transaction = null) {
        return await chat.findAll({
            offset: chatSort.offset,
            limit: chatSort.limit,
            order: chatSort.order,
            transaction: transaction
        })
    }

    static async showChat(chatId, transaction = null) {
        return await chat.findOne({
            where: {
                chat_id: chatId
            },
            transaction: transaction
        })
    }

    static async updateChat(chatData, chatId, transaction) {
        return await chat.update(
            chatData, {
                where: {
                    chat_id: chatId
                },
                returning: true,
                transaction: transaction
            })
    }

    static async deleteChat(chatId, transaction) {
        return await chat.destroy({
            where: {
                chat_id: chatId
            },
            transaction: transaction
        })
    }

    static async countChat() {
        return await chat.count()
    }

}

module.exports = {ChatDatabaseService}