const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {users} = initModels(SequelizeConnect)

class UserDatabaseService {

    static async allUsers() {
        return await users.findAll()
    }

}

module.exports = {UserDatabaseService}