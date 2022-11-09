const {Router} = require("express");

const routerApi = Router()

routerApi
    .use('/', () => {})

module.exports = {routerApi}