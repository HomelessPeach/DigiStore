const {SequelizeConnect} = require("../../services/database-connect");
const {AuthBusinessService} = require("../../services/auth-services/auth.business.service")
const {UserBusinessService} = require("../../services/user-services/user.business.service");

class AuthController {

    static async login(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body} = req
            const tokens = await AuthBusinessService.userLogin(body, transaction)
            await transaction.commit();
            res.cookie('refreshToken', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json({accessToken: tokens.access_token})
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async refresh(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {cookies: {refreshToken}} = req;
            const tokens = await AuthBusinessService.userRefresh(refreshToken, transaction)
            await transaction.commit();
            res.cookie('refreshToken', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json({accessToken: tokens.access_token})
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async logout(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {cookies: {refreshToken}} = req;
            await AuthBusinessService.userLogout(refreshToken, transaction)
            await transaction.commit();
            res.clearCookie('refreshToken');
            res.json('Токен удалён');
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async registration(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body} = req
            await UserBusinessService.createSimpleUser(body, transaction)
            const tokens = await AuthBusinessService.userLogin(body, transaction)
            await transaction.commit();
            res.cookie('refreshToken', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json({accessToken: tokens.access_token})
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async sendResetPassword(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body} = req
            await AuthBusinessService.sendResetPassword(body, transaction)
            await transaction.commit();
            res.json('')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async resetPassword(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {token} = req.params
            const {body} = req
            await AuthBusinessService.resetPassword(body, token, transaction)
            await transaction.commit();
            res.json('')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {AuthController}
