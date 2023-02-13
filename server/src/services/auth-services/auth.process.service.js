const {compare} = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {AuthDatabaseService} = require('./auth.database.service')
const {UserDatabaseService} = require("../user-services/user.database.service")
const {ApiError} = require("../../errors/api.error")
const {application} = require('../../../config/config');

class AuthProcessService {

    static tokenDataToWrite(userId, refreshToken) {
        const dateExpired = new Date();
        dateExpired.setDate(dateExpired.getDate() + 30);
        return {
            token_jwt: refreshToken,
            fk_user: userId,
            expired: dateExpired
        }
    }

    static async getTokenInfo(refreshToken, transaction) {
        const token = await AuthDatabaseService.findToken(refreshToken, transaction)
        if (!token)
            throw ApiError.UnauthorizedError();
        return token
    }

    static async checkUser(userData, transaction = null) {
        const user = await UserDatabaseService.findUserByEmail(userData.user_email, transaction)
        const isValidPassword = await compare(userData.user_password, user.user_password)
        if (!isValidPassword)
            throw ApiError.BadRequest('Ошибка авторизации!');
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
            throw ApiError.UnauthorizedError();
        }
    }

    static validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, application.refreshTokenKey);
        } catch (err) {
            throw ApiError.UnauthorizedError();
        }
    }

}

module.exports = {AuthProcessService}