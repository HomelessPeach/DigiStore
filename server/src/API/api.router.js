const {Router} = require("express");
const {routerChat} = require("./routers/chat.router");
const {routerFeedback} = require("./routers/feedback.router");
const {routerNews} = require("./routers/news.router");
const {routerOrder} = require("./routers/order.router");
const {routerProduct} = require("./routers/product.router");
const {routerProductCategory} = require("./routers/product-category.router");
const {routerProductFeature} = require("./routers/product-feature.router");
const {routerUser} = require("./routers/user.router");

const routerApi = Router()

routerApi
    .use('/chat', routerChat)
    .use('/feedback', routerFeedback)
    .use('/news', routerNews)
    .use('/order', routerOrder)
    .use('/product', routerProduct)
    .use('/product_category', routerProductCategory)
    .use('/product_feature', routerProductFeature)
    .use('/user', routerUser)

module.exports = {routerApi}