const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {news} = initModels(SequelizeConnect)

class NewsDatabaseService {

    static async createNews(newsData, transaction) {
        return news.create(
            newsData, {
                transaction: transaction
            })
    }

    static async listNews(newsSort, transaction = null) {
        return await news.findAll({
            offset: newsSort.offset,
            limit: newsSort.limit,
            order: newsSort.order,
            transaction: transaction
        })
    }

    static async showNews(newsId, transaction = null) {
        return await news.findOne({
            where: {
                news_id: newsId
            },
            transaction: transaction
        })
    }

    static async updateNews(newsData, newsId, transaction) {
        return await news.update(
            newsData, {
                where: {
                    news_id: newsId
                },
                returning: true,
                transaction: transaction
            })
    }

    static async deleteNews(newsId, transaction) {
        return await news.destroy({
            where: {
                news_id: newsId
            },
            transaction: transaction
        })
    }

    static async countNews() {
        return await news.count()
    }

}

module.exports = {NewsDatabaseService}