const {SequelizeConnect} = require("../../services/database-connect");
const {FeedbackBusinessService} = require("../../services/feedback-services/fredback.business.service")

class FeedbackController {

    static async createFeedback(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;

            await transaction.commit();
            res.json('')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listFeedback(req, res, next) {
        try {
            const {query} = req
            const {feedbacks, countFeedbacks} = await FeedbackBusinessService.listFeedback(query)
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${countFeedbacks}`)
                .json(feedbacks)
        } catch (err) {
            next(err)
        }
    }

    static async showFeedback(req, res, next) {
        try {
            const {id} = req.params;
            const feedback = await FeedbackBusinessService.showFeedback(id)
            res.json(feedback)
        } catch (err) {
            next(err)
        }
    }

    static async markAsAnsweredFeedback(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;
            const feedback = await FeedbackBusinessService.markAsAnsweredFeedback(id, transaction)
            await transaction.commit();
            res.json(`Помечено как отвечено #${feedback.feedback_id}`)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {FeedbackController}