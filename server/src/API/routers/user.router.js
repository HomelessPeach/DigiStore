const {Router} = require("express");
const multer = require("multer")
const {UserController} = require("../controllers/user.controller");
const {AuthMiddleware} = require("../../middlewares/auth-middleware")

const routerUser = Router()
const middlewareMulter = multer();

routerUser
    .post('/admin', AuthMiddleware, middlewareMulter.fields([{name: 'sourceImage'}]), UserController.createUser)
    .get('/admin', AuthMiddleware, UserController.listUser)
    .get('/admin/:id', AuthMiddleware, UserController.showUser)
    .put('/admin/:id', AuthMiddleware, middlewareMulter.fields([{name: 'sourceImage'}]), UserController.updateUser)
    .delete('/admin/:id', AuthMiddleware, UserController.deleteUser)
    .put('/update-info', middlewareMulter.fields([{name: 'sourceImage'}]), UserController.updateUser)
module.exports = {routerUser}