class ChatProcessService {

    static chatDataWrite(query) {
        const chatData = {
            fk_user: query.fk_user,
            is_answer: 0,
        }

        return {chatData}
    }

    static chatDataList(query) {

        const chatData = {

        }

        const chatSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'chat_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {chatSort}
    }

    static chatMessageDataWrite(query) {

        const chatMessageData = {
            chat_message_content: query.chat_message_content,
            fk_chat: query.fk_chat,
            is_user: query.is_user,
        }

        return {chatMessageData}
    }
}

module.exports = {ChatProcessService}