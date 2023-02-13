const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {auth_tokens} = initModels(SequelizeConnect)

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

}

module.exports = {AuthDatabaseService}