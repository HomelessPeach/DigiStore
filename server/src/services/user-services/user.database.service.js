const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {users} = initModels(SequelizeConnect)

class UserDatabaseService {

    static async listUsers(userSort) {
        return await users.findAll({
            offset: userSort.offset,
            limit: userSort.limit,
            order: userSort.order,
        })
    }

    static async countUsers() {
        return await users.count()
    }

}

module.exports = {UserDatabaseService}