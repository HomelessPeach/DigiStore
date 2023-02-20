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
            transaction: transaction
        })
    }

    static async showOrder(orderId, transaction = null) {
        return await orders.findOne({
            where: {
                order_id: orderId
            },
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

}

module.exports = {OrderDatabaseService}