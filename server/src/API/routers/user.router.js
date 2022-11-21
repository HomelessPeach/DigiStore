const {Router} = require("express");
const {UserController} = require("../controllers/user.controller");

const routerUser = Router()

routerUser
    .post('/', UserController.createUser)
    .get('/', UserController.listUser)
    .get('/:id', UserController.showUser)
    .put('/:id', UserController.updateUser)
    .delete('/:id', UserController.deleteUser)

module.exports = {routerUser}