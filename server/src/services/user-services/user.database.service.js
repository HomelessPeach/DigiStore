const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {users, images, chats, favorite_products, orders, reviews} = initModels(SequelizeConnect)

class UserDatabaseService {

    static async findUserByEmail(email, transaction = null) {
        return await users.findOne({
            where: {
                user_email: email
            },
            attributes: [
                'user_id',
                'user_email',
                'user_name',
                'user_phone_number',
                'is_admin',
            ],
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
            attributes: [
                'user_id',
                'user_email',
                'user_name',
                'user_phone_number',
                'is_admin',
            ],
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
            attributes: [
                'user_id',
                'user_email',
                'user_name',
                'user_phone_number',
                'is_admin',
            ],
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

    static async deleteUserFromChat(userId, transaction) {
        return await chats.update(
            {
                fk_user: null,
            }, {
                where: {
                    fk_user: userId
                },
                transaction: transaction
            })
    }

    static async deleteUserFromFavoriteProducts(userId, transaction) {
        return await favorite_products.update(
            {
                fk_user: null,
            }, {
                where: {
                    fk_user: userId
                },
                transaction: transaction
            })
    }

    static async deleteUserFromOrder(userId, transaction) {
        return await orders.update(
            {
                fk_user: null,
            }, {
                where: {
                    fk_user: userId
                },
                transaction: transaction
            })
    }

    static async deleteUserFromReview(userId, transaction) {
        return await reviews.update(
            {
                fk_user: null,
            }, {
                where: {
                    fk_user: userId
                },
                transaction: transaction
            })
    }

}

module.exports = {UserDatabaseService}