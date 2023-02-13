const {ApiError} = require("../errors/api.error")
const {AuthProcessService} = require("../services/auth-services/auth.process.service")

const AuthMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const tokenData = AuthProcessService.validateAccessToken(accessToken);

        if (!tokenData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = {
            user_id: tokenData.userId,
            user_email: tokenData.email,
            user_name: tokenData.user_name,
            user_phone_number: tokenData.user_phone_number,
            is_admin: tokenData.is_admin,
            image: tokenData.image
        };

        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }

}

module.exports = {AuthMiddleware}