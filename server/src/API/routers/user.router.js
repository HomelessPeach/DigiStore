const {Router} = require("express");
const multer = require("multer")
const {UserController} = require("../controllers/user.controller");

const routerUser = Router()
const middlewareMulter = multer();

routerUser
    .post('/admin', middlewareMulter.fields([{name: 'sourceImage'}]), UserController.createUser)
    .get('/admin', UserController.listUser)
    .get('/admin/:id', UserController.showUser)
    .put('/admin/:id', middlewareMulter.fields([{name: 'sourceImage'}]), UserController.updateUser)
    .delete('/admin/:id', UserController.deleteUser)

module.exports = {routerUser}