const {Router} = require("express");
const multer = require("multer")
const {UserController} = require("../controllers/user.controller");

const routerUser = Router()
const middlewareMulter = multer();

routerUser
    .post('/', middlewareMulter.fields([{name: 'sourceImage'}]), UserController.createUser)
    .get('/', UserController.listUser)
    .get('/:id', UserController.showUser)
    .put('/:id', middlewareMulter.fields([{name: 'sourceImage'}]), UserController.updateUser)
    .delete('/:id', UserController.deleteUser)

module.exports = {routerUser}