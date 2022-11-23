class ChatProcessService {

    static chatDataWrite() {

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

}

module.exports = {ChatProcessService}