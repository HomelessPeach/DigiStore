const {SequelizeConnect} = require("../../services/database-connect");
const {NewsBusinessService} = require("../../services/news-services/news.business.service")

class NewsController {

    static async getAllNews(req, res, next) {
        try {
            const {query} = req
            const news = await NewsBusinessService.getAllNews(query)
            res.json(news)
        } catch (err) {
            next(err)
        }
    }

    static async getNews(req, res, next) {
        try {
            const {id} = req.params;
            const news = await NewsBusinessService.getNews(id)
            res.json(news)
        } catch (err) {
            next(err)
        }
    }

    static async createNews(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            const body = JSON.parse(data);
            const news = await NewsBusinessService.createNews(body, files, transaction)
            await transaction.commit();
            res.json(news)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listNews(req, res, next) {
        try {
            const {query} = req
            const {news, countNews} = await NewsBusinessService.listNews(query)
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${countNews}`)
                .json(news)
        } catch (err) {
            next(err)
        }
    }

    static async showNews(req, res, next) {
        try {
            const {id} = req.params;
            const news = await NewsBusinessService.showNews(id)
            res.json(news)
        } catch (err) {
            next(err)
        }
    }

    static async updateNews(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            const body = JSON.parse(data);
            const news = await NewsBusinessService.updateNews(body, files, transaction)
            await transaction.commit();
            res.json(news)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async deleteNews(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;
            await NewsBusinessService.deleteNews(id, transaction)
            await transaction.commit();
            res.json('Данные удалены')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {NewsController}