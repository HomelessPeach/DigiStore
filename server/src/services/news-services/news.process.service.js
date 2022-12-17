class NewsProcessService {

    static newsDataWrite(query) {

        const newsData = {
            news_name: query.news_name,
            news_short_description: query.news_short_description || null,
            news_description: query.news_description || null,
            is_publish: query.is_publish || false
        }

        const newsId = query.news_id;

        return  {newsData, newsId}
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