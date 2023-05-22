const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {auth_tokens, reset_password} = initModels(SequelizeConnect)

class AuthDatabaseService {

    static async findToken(refreshToken, transaction = null) {
        return await auth_tokens.findOne({
            where: {
                token_jwt: refreshToken
            },
            transaction: transaction
        })
    }

    static async createToken(tokenData, transaction) {
        return auth_tokens.create(tokenData, {
            transaction: transaction
        })
    }

    static async updateToken(tokenData, refreshToken, transaction) {
        return auth_tokens.update(tokenData, {
            where: {
                token_jwt: refreshToken,
            },
            transaction: transaction
        })
    }

    static async deleteToken(refreshToken, transaction) {
        return auth_tokens.destroy({
            where: {
                token_jwt: refreshToken,
            },
            transaction: transaction,
        })
    }

    static async deleteTokenById(userId, transaction) {
        return auth_tokens.destroy({
            where: {
                fk_user: userId,
            },
            transaction: transaction,
        })
    }

    static async createResetPassword(data, transaction) {
        return reset_password.create(data, {
            transaction: transaction
        })
    }

    static async getResetPassword(token, transaction = null) {
        return reset_password.findOne({
            where: {
                reset_password_token: token
            },
            transaction: transaction
        })
    }

    static async deleteResetPassword(userId, transaction) {
        await reset_password.destroy({
            where: {
                fk_user: userId,
            },
            transaction: transaction
        })
    }

}

module.exports = {AuthDatabaseService}