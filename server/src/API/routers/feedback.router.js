const {Router} = require("express");
const {FeedbackController} = require("../controllers/feedback.controller");

const routerFeedback = Router()

routerFeedback
    .post('/create', FeedbackController.createFeedback)
    .get('/list', FeedbackController.listFeedback)
    .get('/show/:id', FeedbackController.showFeedback)

module.exports = {routerFeedback}