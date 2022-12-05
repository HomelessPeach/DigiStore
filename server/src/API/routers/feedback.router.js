const {Router} = require("express");
const {FeedbackController} = require("../controllers/feedback.controller");

const routerFeedback = Router()

routerFeedback
    .post('/admin', FeedbackController.createFeedback)
    .get('/admin', FeedbackController.listFeedback)
    .get('/admin/:id', FeedbackController.showFeedback)

module.exports = {routerFeedback}