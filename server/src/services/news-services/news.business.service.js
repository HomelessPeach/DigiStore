const {NewsDatabaseService} = require("./news.database.service");
const {NewsProcessService} = require("./news.process.service");

class NewsBusinessService {

    static async createNews() {
        return 1
    }

    static async listNews(query) {
        const {newsSort} = NewsProcessService.newsDataList(query)
        const news = await NewsDatabaseService.listNews(newsSort)
        const countNews = await NewsDatabaseService.countNews()
        return {news, countNews}
    }

    static async showNews(newsId) {
        return await NewsDatabaseService.showNews(newsId)
    }

    static async updateNews() {
        return 1
    }

    static async deleteNews(newsId) {
        return await NewsDatabaseService.deleteNews(newsId)
    }

}

module.exports = {NewsBusinessService}