const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {feedbacks} = initModels(SequelizeConnect)

class FeedbackDatabaseService {

    static async createFeedback(feedbackData, transaction) {
        return feedbacks.create(
            feedbackData, {
                transaction: transaction
            })
    }

    static async listFeedback(feedbackSort, transaction = null) {
        return await feedbacks.findAll({
            offset: feedbackSort.offset,
            limit: feedbackSort.limit,
            order: feedbackSort.order,
            transaction: transaction
        })
    }

    static async showFeedback(feedbackId, transaction = null) {
        return await feedbacks.findOne({
            where: {
                feedback_id: feedbackId
            },
            transaction: transaction
        })
    }


    static async countFeedback() {
        return await feedbacks.count()
    }

}

module.exports = {FeedbackDatabaseService}