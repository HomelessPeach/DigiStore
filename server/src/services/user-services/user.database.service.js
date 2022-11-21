const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {users} = initModels(SequelizeConnect)

class UserDatabaseService {

    static async createUser(userData, transaction) {
        return users.create(
            userData, {
                transaction: transaction
            })
    }

    static async listUsers(userSort, transaction = null) {
        return await users.findAll({
            offset: userSort.offset,
            limit: userSort.limit,
            order: userSort.order,
            transaction: transaction
        })
    }

    static async showUser(userId, transaction = null) {
        return await users.findOne({
            where: {
                user_id: userId
            },
            transaction: transaction
        })
    }

    static async updateUser(userData, userId, transaction) {
        return await users.update(
            userData, {
                where: {
                    user_id: userId
                },
                returning: true,
                transaction: transaction
            })
    }

    static async deleteUser(userId, transaction) {
        return await users.destroy({
            where: {
                user_id: userId
            },
            transaction: transaction
        })
    }

    static async countUsers() {
        return await users.count()
    }

}

module.exports = {UserDatabaseService}