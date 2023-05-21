const {compare} = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {AuthDatabaseService} = require('./auth.database.service')
const {UserDatabaseService} = require("../user-services/user.database.service")
const {ApiError} = require("../../errors/api.error")
const {application} = require('../../../config/config');
const {v4} = require("uuid")

class AuthProcessService {

    static tokenDataToWrite(userId, refreshToken) {
        const dateExpired = new Date();
        dateExpired.setDate(dateExpired.getDate() + 30);
        return {
            token_jwt: refreshToken,
            fk_user: userId,
            expired: dateExpired.toJSON().slice(0, 19).replace('T', ' ')
        }
    }

    static async getTokenInfo(refreshToken, transaction) {
        const token = await AuthDatabaseService.findToken(refreshToken, transaction)
        if (!token)
            throw ApiError.UnauthorizedError();
        return token
    }

    static async isUserExist(userData, transaction = null) {
        const user = await UserDatabaseService.findUserByEmail(userData.user_email, transaction)
        if (user)
            throw ApiError.BadRequest('Пользователь уже существует');
    }

    static async checkUser(userData, transaction = null) {
        const user = await UserDatabaseService.findUserByEmail(userData.user_email, transaction)
        if (!user)
            throw ApiError.UnauthorizedError();
        const isValidPassword = await compare(userData.password, user.user_password)
        if (!isValidPassword)
            throw ApiError.UnauthorizedError();
        return {
            user_id: user.user_id,
            user_email: user.user_email,
            user_name: user.user_name,
            user_phone_number: user.user_phone_number,
            is_admin: user.is_admin,
            image: user.image?.image_path
        }
    }

    static async getUserInfo(userData, transaction = null) {
        const user = await UserDatabaseService.showUser(userData.user_id, transaction)
        if (!user)
            throw ApiError.UnauthorizedError();
        return {
            user_id: user.user_id,
            user_email: user.user_email,
            user_name: user.user_name,
            user_phone_number: user.user_phone_number,
            is_admin: user.is_admin,
            image: user.image?.image_path
        }
    }

    static generateToken(userData) {
        return {
            access_token: jwt.sign(userData, application.accessTokenKey, {expiresIn: '15m'}),
            refresh_token: jwt.sign(userData, application.refreshTokenKey, {expiresIn: '30d'})
        }
    }

    static async saveToken(tokenData, transaction) {
        return await AuthDatabaseService.createToken(tokenData, transaction)
    }

    static async validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, application.accessTokenKey);
        } catch (err) {
            return null
        }
    }

    static validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, application.refreshTokenKey);
        } catch (err) {
            return null
        }
    }

    static async createResetPasswordToken(userEmail, transaction) {
        const user = await UserDatabaseService.findUserByEmail(userEmail, transaction)
        if (!user)
            throw ApiError.BadRequest('')
        const date = new Date()
        const tokenData = {
            fk_user: user.user_id,
            reset_password_token: v4(),
            expired_at: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours() + 3}:${date.getMinutes()}:${date.getSeconds()}`
        }
        await AuthDatabaseService.createResetPassword(tokenData, transaction)
        return tokenData.reset_password_token
    }

    static async resetPasswordPassword(password, resetToken, transaction) {
        const token = await AuthDatabaseService.getResetPassword(resetToken, transaction)
        if (!token || new Date() > new Date(token.expired_at))
            throw ApiError.BadRequest('')
        await UserDatabaseService.updateUser({user_password: password}, token.fk_user, transaction)
        await AuthDatabaseService.deleteResetPassword(token.fk_user, transaction)
    }

}

module.exports = {AuthProcessService}