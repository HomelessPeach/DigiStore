const {UserDatabaseService} = require("../../services/user-services/user.database.service");

class UserController {

    static async listUser(req, res, next) {
        try {
            const users = await UserDatabaseService.allUsers()
            res.json(users)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = {UserController}