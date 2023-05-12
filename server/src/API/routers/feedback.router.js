const {Router} = require("express");
const {FeedbackController} = require("../controllers/feedback.controller");
const {AuthMiddleware} = require("../../middlewares/auth-middleware")

const routerFeedback = Router()

routerFeedback
    .post('/create', FeedbackController.createFeedback)
    .get('/admin', AuthMiddleware, FeedbackController.listFeedback)
    .get('/admin/:id', AuthMiddleware, FeedbackController.showFeedback)
    .put('/answered/:id', AuthMiddleware, FeedbackController.markAsAnsweredFeedback)

module.exports = {routerFeedback}