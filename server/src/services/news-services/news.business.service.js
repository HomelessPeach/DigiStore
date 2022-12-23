const {NewsDatabaseService} = require("./news.database.service");
const {NewsProcessService} = require("./news.process.service");
const {FileService} = require("../file-services/file.service");
const {folderPath} = require("../../../config/config");

class NewsBusinessService {

    static async getAllNews(query) {
        return await NewsDatabaseService.getAllNews()
    }

    static async getNews(newsId) {
        return await NewsDatabaseService.getNews(newsId)
    }

    static async createNews(body, files, transaction) {
        const {newsData} = NewsProcessService.newsDataWrite(body)
        if (files.sourceImage?.length) {
            const image = await FileService.createImage(files.sourceImage[0], folderPath.news, transaction)
            newsData.fk_image = image.image_id
        }
        return await NewsDatabaseService.createNews(newsData, transaction)
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

    static async updateNews(body, files, transaction) {
        const {newsData, newsId} = NewsProcessService.newsDataWrite(body)
        if (files.sourceImage?.length) {
            const image = await FileService.createImage(files.sourceImage[0], folderPath.news, transaction)
            newsData.fk_image = image.image_id
        }
        const news = await NewsDatabaseService.updateNews(newsData, newsId, transaction)
        if (newsData.fk_image && body.image?.image_path) {
            await FileService.deleteImage(body.image.image_path, folderPath.news, transaction)
                .catch((err) => console.error(err));
        }
        return news
    }

    static async deleteNews(newsId, transaction) {
        const newsData = await NewsDatabaseService.showNews(newsId, transaction)
        const news = newsData.get({plain: true})
        const deleteNews = await NewsDatabaseService.deleteNews(newsId, transaction)
        if (news.image?.image_path) {
            await FileService.deleteImage(news.image.image_path, folderPath.news, transaction)
                .catch((err) => console.error(err));
        }
        return deleteNews
    }

}

module.exports = {NewsBusinessService}