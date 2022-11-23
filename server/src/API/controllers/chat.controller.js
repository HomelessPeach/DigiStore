const {SequelizeConnect} = require("../../services/database-connect");
const {ChatBusinessService} = require("../../services/chat-services/chat.business.service")

class ChatMessageController {

    static async createChatMessage(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            await transaction.commit();
            const chat = await ChatBusinessService.createChatMessage()
            res.json(chat)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listChatMessage(req, res, next) {
        try {
            const {query} = req
            const {chats, countChats} = await ChatBusinessService.listChatMessage(query)
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${countChats}`)
                .json(chats)
        } catch (err) {
            next(err)
        }
    }

    static async showChatMessage(req, res, next) {
        try {
            const {id} = req.params;
            const chat = await ChatBusinessService.showChatMessage(id)
            res.json(chat)
        } catch (err) {
            next(err)
        }
    }

    static async updateChatMessage(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            await transaction.commit();
            const chat = await ChatBusinessService.updateChatMessage()
            res.json('')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async deleteChatMessage(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;
            await ChatBusinessService.deleteChatMessage()
            await transaction.commit();
            res.json('Данные удалены')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {ChatMessageController}