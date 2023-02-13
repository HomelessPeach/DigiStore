const {AuthDatabaseService} = require("./auth.database.service")
const {AuthProcessService} = require("./auth.process.service")

class AuthBusinessService {

    static async userLogin(userData, transaction) {
        const user = await AuthProcessService.checkUser(userData, transaction)
        const tokens = AuthProcessService.generateToken(user)
        const tokenData = AuthProcessService.tokenDataToWrite(user.user_id, tokens.refresh_token)
        await AuthDatabaseService.createToken(tokenData, transaction)
        return {user, tokens}
    }

    static async userRefresh(refreshToken, transaction) {
        const tokenPayload = AuthProcessService.validateRefreshToken(refreshToken)
        const tokens = AuthProcessService.generateToken(tokenPayload)
        const tokenData = await AuthProcessService.getTokenInfo(refreshToken, transaction)
        const updateTokenData = AuthProcessService.tokenDataToWrite(tokenData.fk_user, tokens.refresh_token)
        await AuthDatabaseService.updateToken(updateTokenData, refreshToken, transaction)
        return tokens
    }

    static async userLogout(refreshToken, transaction) {
        AuthProcessService.validateRefreshToken(refreshToken);
        return await AuthDatabaseService.deleteToken(refreshToken, transaction);
    }

}

module.exports = {AuthBusinessService}