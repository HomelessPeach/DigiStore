class UserProcessService {

    static UserProcessToList(query) {
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