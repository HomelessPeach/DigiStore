const {SequelizeConnect} = require("../../services/database-connect");
const {ChatBusinessService} = require("../../services/chat-services/chat.business.service")

class ChatController {

    static async createChat(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body} = req;
            const chat = await ChatBusinessService.createChat(body, transaction)
            await transaction.commit();
            res.json(chat)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async getUserChat(req, res, next) {
        try {
            const {user} = req.params;
            const chat = await ChatBusinessService.getUserChat(user)
            res.json(chat)
        } catch (err) {
            next(err)
        }
    }

    static async listChat(req, res, next) {
        try {
            const {query} = req
            const {chats, countChats} = await ChatBusinessService.listChat(query)
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${countChats}`)
                .json(chats)
        } catch (err) {
            next(err)
        }
    }

    static async showChat(req, res, next) {
        try {
            const {id} = req.params;
            const chat = await ChatBusinessService.showChat(id)
            res.json(chat)
        } catch (err) {
            next(err)
        }
    }

    static async createMessage(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body} = req;
            const message = await ChatBusinessService.createMessage(body)
            await transaction.commit();
            res.json(message)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }
}

module.exports = {ChatController}