const {Router} = require("express");
const {FeedbackController} = require("../controllers/feedback.controller");

const routerFeedback = Router()

routerFeedback
    .post('/create', FeedbackController.createFeedback)
    .get('/admin', FeedbackController.listFeedback)
    .get('/admin/:id', FeedbackController.showFeedback)
    .put('/answered/:id', FeedbackController.markAsAnsweredFeedback)

module.exports = {routerFeedback}