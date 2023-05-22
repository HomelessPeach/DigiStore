const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {order_products, orders} = initModels(SequelizeConnect)

class OrderDatabaseService {

    static async createOrder(orderData, transaction) {
        return orders.create(
            orderData, {
                transaction: transaction
            })
    }

    static async listOrder(orderSort, transaction = null) {
        return await orders.findAll({
            offset: orderSort.offset,
            limit: orderSort.limit,
            order: orderSort.order,
            attributes: [
                'order_id',
                'order_number',
                'fk_user',
                'client_name',
                'client_phone_number',
                'is_complete',
                'is_cancel'
            ],
            transaction: transaction
        })
    }

    static async showOrder(orderId, transaction = null) {
        return await orders.findOne({
            where: {
                order_id: orderId
            },
            attributes: [
                'order_id',
                'order_number',
                'fk_user',
                'client_name',
                'client_phone_number',
                'client_email',
                'is_complete',
                'is_cancel'
            ],
            include: [{
                model: order_products,
                as: 'order_products',
                attributes: [
                    'fk_product',
                    'order_product_count',
                    'order_product_price',
                    'order_product_name'
                ],
            }],
            transaction: transaction
        })
    }

    static async countOrder() {
        return await orders.count()
    }

    static async createProductOrder(orderProductData, transaction) {
        return order_products.create(
            orderProductData, {
                transaction: transaction
            })
    }

    static async cancelOrder(orderId, transaction) {
        return await orders.update(
            {
                is_cancel: true,
            },{
                where: {
                    order_id: orderId,
                    is_complete: false
                },
                returning: true,
                transaction: transaction
            }
        )
    }

    static async completeOrder(orderId, transaction) {
        return await orders.update(
            {
                is_complete: true,
            },{
                where: {
                    order_id: orderId,
                    is_cancel: false
                },
                returning: true,
                transaction: transaction
            }
        )
    }

    static async getUserOrder(userId, transaction = null) {
        return orders.findAll({
            where: {
                fk_user: userId
            },
            attributes: [
                'order_id',
                'order_number',
                'client_name',
                'client_phone_number',
                'client_email',
                'is_complete',
                'is_cancel'
            ],
            include: [{
                model: order_products,
                as: 'order_products',
                attributes: [
                    'fk_product',
                    'order_product_count',
                    'order_product_price',
                    'order_product_name'
                ],
            }],
            transaction: transaction
        })
    }

}

module.exports = {OrderDatabaseService}