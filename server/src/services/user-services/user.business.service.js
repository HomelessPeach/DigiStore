const {UserDatabaseService} = require("./user.database.service");
const {UserProcessService} = require("./user.process.service");

class UserBusinessService {

    static async createUser() {
        return 1
    }

    static async listUser(query) {
        const {userSort} = UserProcessService.userDataList(query)
        const users = await UserDatabaseService.listUser(userSort)
        const countUsers = await UserDatabaseService.countUser()
        return {users, countUsers}
    }

    static async showUser(userId) {
        return await UserDatabaseService.showUser(userId)
    }

    static async updateUser() {
        return 1
    }

    static async deleteUser(userId) {
        return await UserDatabaseService.deleteUser(userId)
    }

}

module.exports = {UserBusinessService}