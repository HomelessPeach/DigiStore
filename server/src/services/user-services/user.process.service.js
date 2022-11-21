class UserProcessService {

    static userDataWrite() {

    }

    static userDataList(query) {

        const userData = {
            user_id: query.user_id,
            user_email: query.user_email,
            user_name: query.user_name,
            user_phone: query.user_phone_number
        }

        const userSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'user_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {userSort}
    }

}

module.exports = {UserProcessService}