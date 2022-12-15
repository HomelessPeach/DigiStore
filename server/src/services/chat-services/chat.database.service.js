const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {chats, chat_messages} = initModels(SequelizeConnect)

class ChatDatabaseService {

    static async createChat(chatData, transaction) {
        return chats.create(
            chatData, {
                transaction: transaction
            })
    }

    static async listChat(chatSort, transaction = null) {
        return await chats.findAll({
            offset: chatSort.offset,
            limit: chatSort.limit,
            order: chatSort.order,
            attributes: [
                'chat_id',
                'fk_user',
                'is_answer'
            ],
            transaction: transaction
        })
    }

    static async showChat(chatId, transaction = null) {
        return await chats.findOne({
            where: {
                chat_id: chatId
            },
            order: [[{model: chat_messages, as: 'chat_messages'}, 'create_at', 'ASC']],
            attributes: [
                'chat_id',
                'fk_user',
                'is_answer'
            ],
            include: [{
                model: chat_messages,
                as: 'chat_messages',
                attributes: [
                    'chat_message_content',
                    'create_at',
                    'is_user'
                ]
            }],
            transaction: transaction
        })
    }

    static async updateChat(chatData, chatId, transaction) {
        return await chats.update(
            chatData, {
                where: {
                    chat_id: chatId
                },
                returning: true,
                transaction: transaction
            })
    }

    static async deleteChat(chatId, transaction) {
        return await chats.destroy({
            where: {
                chat_id: chatId
            },
            transaction: transaction
        })
    }

    static async countChat() {
        return await chats.count()
    }

    static async updateChatStatus(isAnswer, chatId, transaction) {
        return chats.update(
            {is_answer: isAnswer}, {
                where: {
                    chat_id: chatId
                },
                transaction: transaction
            })
    }

    static async createMessage(chatMessageData, transaction) {
        return chat_messages.create(
            chatMessageData, {
                transaction: transaction
            })
    }

}

module.exports = {ChatDatabaseService}