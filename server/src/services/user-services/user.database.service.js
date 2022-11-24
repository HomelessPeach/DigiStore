const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {users, images} = initModels(SequelizeConnect)

class UserDatabaseService {

    static async createUser(userData, transaction) {
        return users.create(
            userData, {
                transaction: transaction
            })
    }

    static async listUser(userSort, transaction = null) {
        return await users.findAll({
            offset: userSort.offset,
            limit: userSort.limit,
            order: userSort.order,
            include: [{
                model: images,
                as: 'image',
                attributes: [
                    'image_path',
                ],
            }],
            transaction: transaction
        })
    }

    static async showUser(userId, transaction = null) {
        return await users.findOne({
            where: {
                user_id: userId
            },
            include: [{
                model: images,
                as: 'image',
                attributes: [
                    'image_path',
                ],
            }],
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

    static async countUser() {
        return await users.count()
    }

}

module.exports = {UserDatabaseService}