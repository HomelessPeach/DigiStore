const {UserDatabaseService} = require("./user.database.service");
const {UserProcessService} = require("./user.process.service");

class UserBusinessService {

    static async createUser() {
        return 1
    }

    static async listUser(query) {
        const {userSort} = UserProcessService.UserProcessToList(query)
        const users = await UserDatabaseService.listUsers(userSort)
        const countUsers = await UserDatabaseService.countUsers()
        return {users, countUsers}
    }

    static async showUser() {
        return 1
    }

    static async updateUser() {
        return 1
    }

    static async deleteUser() {
        return 1
    }

}

module.exports = {UserBusinessService}