const {FeedbackDatabaseService} = require("./fredback.database.service");
const {FeedbackProcessService} = require("./fredback.process.service");

class FeedbackBusinessService {

    static async createFeedback() {
        return 1
    }

    static async listFeedback(query) {
        const {feedbackSort} = FeedbackProcessService.feedbackDataList(query)
        const feedbacks = await FeedbackDatabaseService.listFeedback(feedbackSort)
        const countFeedbacks = await FeedbackDatabaseService.countFeedback()
        return {feedbacks, countFeedbacks}
    }

    static async showFeedback(feedbackId) {
        return await FeedbackDatabaseService.showFeedback(feedbackId)
    }

    static async markAsAnsweredFeedback(feedbackId, transaction) {
        return await FeedbackDatabaseService.markAsAnsweredFeedback(feedbackId, transaction)
    }

}

module.exports = {FeedbackBusinessService}