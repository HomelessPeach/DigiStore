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
            attributes: [
                'feedback_id',
                'feedback_email',
                'is_answer',
            ],
            transaction: transaction
        })
    }

    static async showFeedback(feedbackId, transaction = null) {
        return await feedbacks.findOne({
            where: {
                feedback_id: feedbackId
            },
            attributes: [
                'feedback_id',
                'feedback_email',
                'feedback_message',
                'is_answer',
            ],
            transaction: transaction
        })
    }

    static async markAsAnsweredFeedback(feedbackId, transaction) {
        return await feedbacks.update(
            {
                is_answer: true
            }, {
                where: {
                    feedback_id: feedbackId
                },
                returning: true,
                transaction: transaction
            })
    }


    static async countFeedback() {
        return await feedbacks.count()
    }

}

module.exports = {FeedbackDatabaseService}