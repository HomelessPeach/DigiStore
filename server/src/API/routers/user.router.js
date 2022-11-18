const {Router} = require("express");
const {UserController} = require("../controllers/user.controller");

const routerUser = Router()

routerUser
    .get('/list', UserController.listUser)

module.exports = {routerUser}