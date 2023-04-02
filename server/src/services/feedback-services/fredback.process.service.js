class FeedbackProcessService {

    static feedbackDataWrite(query) {
        const feedbackData = {
            feedback_email: query.feedback_email,
            feedback_message: query.feedback_message,
        }

        return {feedbackData}
    }

    static feedbackDataList(query) {

        const feedbackData = {

        }

        const feedbackSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'feedback_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {feedbackSort}
    }

}

module.exports = {FeedbackProcessService}