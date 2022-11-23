const {Router} = require("express");
const multer = require("multer")
const {UserController} = require("../controllers/user.controller");

const routerUser = Router()
const middlewareMulter = multer();

routerUser
    .post('/create', middlewareMulter.fields([{name: 'sourceImage'}]), UserController.createUser)
    .get('/list', UserController.listUser)
    .get('/show/:id', UserController.showUser)
    .put('/update/:id', middlewareMulter.fields([{name: 'sourceImage'}]), UserController.updateUser)
    .delete('/delete/:id', UserController.deleteUser)

module.exports = {routerUser}