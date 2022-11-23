class NewsProcessService {

    static newsDataWrite() {

    }

    static newsDataList(query) {

        const newsData = {

        }

        const newsSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'news_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {newsSort}
    }

}

module.exports = {NewsProcessService}