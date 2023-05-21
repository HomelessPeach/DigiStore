const {Router} = require('express')
const {AuthController} = require('../controllers/auth.controller')

const routerAuth = Router()

routerAuth
    .post('/registration', AuthController.registration)
    .post('/login', AuthController.login)
    .put('/refresh', AuthController.refresh)
    .delete('/logout', AuthController.logout)
    .post('/reset-password', AuthController.sendResetPassword)
    .put('/reset-password/:token', AuthController.resetPassword)

module.exports = {routerAuth}
