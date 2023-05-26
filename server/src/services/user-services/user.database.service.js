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
                'user_password',
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

    static async deleteUserFavoriteProducts(userId, transaction) {
        return await favorite_products.destroy(
            {
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

    static async addUserFavoriteProduct(favoriteProductData, transaction) {
        return favorite_products.create(
            favoriteProductData, {
                transaction: transaction
            })
    }

    static async getFavoriteProduct(userId, productId, transaction = null) {
        return await favorite_products.findOne({
            where: {
                fk_user: userId,
                fk_product: productId,
            },
            transaction: transaction
        })
    }

    static async updateUserFavoriteProduct(favoriteProductData, userId, productId, transaction) {
        return await favorite_products.update(
            favoriteProductData,
            {
                where: {
                    fk_user: userId,
                    fk_product: productId,
                },
                transaction: transaction
            })
    }

    static async deleteUserFavoriteProduct(userId, productId, transaction) {
        return await favorite_products.destroy(
            {
                where: {
                    fk_user: userId,
                    fk_product: productId,
                },
                transaction: transaction
            })
    }

    static async getUserProductFavorite(userId) {
        return await favorite_products.findAll({
            where: {
                fk_user: userId,
                is_favorite: true,
            },
            attributes: [
                ['fk_product', 'id'],
            ]
        })
    }

    static async getUserProductInBasket(userId) {
        return await favorite_products.findAll({
            where: {
                fk_user: userId,
                is_basket: true,
            },
            attributes: [
                ['fk_product', 'id'],
                ['basket_count', 'count']
            ]
        })
    }
}

module.exports = {UserDatabaseService}