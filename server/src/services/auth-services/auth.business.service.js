const {AuthDatabaseService} = require("./auth.database.service")
const {AuthProcessService} = require("./auth.process.service")
const {MailService} = require("../../services/mail-services/mail.service")

class AuthBusinessService {

    static async userLogin(userData, transaction) {
        const user = await AuthProcessService.checkUser(userData, transaction)
        const tokens = AuthProcessService.generateToken(user)
        const tokenData = AuthProcessService.tokenDataToWrite(user.user_id, tokens.refresh_token)
        await AuthDatabaseService.createToken(tokenData, transaction)
        return tokens
    }

    static async userRefresh(refreshToken, transaction) {
        const tokenPayload = AuthProcessService.validateRefreshToken(refreshToken)
        const user = await AuthProcessService.getUserInfo(tokenPayload, transaction)
        const tokens = AuthProcessService.generateToken(user)
        const tokenData = await AuthProcessService.getTokenInfo(refreshToken, transaction)
        const updateTokenData = AuthProcessService.tokenDataToWrite(tokenData.fk_user, tokens.refresh_token)
        await AuthDatabaseService.updateToken(updateTokenData, refreshToken, transaction)
        return tokens
    }

    static async userLogout(refreshToken, transaction) {
        AuthProcessService.validateRefreshToken(refreshToken);
        return await AuthDatabaseService.deleteToken(refreshToken, transaction);
    }

    static async sendResetPassword(body, transaction) {
        const token = await AuthProcessService.createResetPasswordToken(body.user_email, transaction)
        const template = await MailService.getTemplate(token)
        await MailService.sendMail(body.user_email, 'Смена пароля', template)
    }

    static async resetPassword(body, token, transaction) {
        await AuthProcessService.resetPasswordPassword(body.user_password, token, transaction)
    }

}

module.exports = {AuthBusinessService}