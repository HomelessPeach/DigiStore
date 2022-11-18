const {Router} = require("express");
const {routerUser} = require("./routers/user.router");

const routerApi = Router()

routerApi
    .use('/admin/user', routerUser)

module.exports = {routerApi}