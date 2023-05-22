const {OrderDatabaseService} = require("./order.database.service");
const {OrderProcessService} = require("./order.process.service");

class OrderBusinessService {

    static async addOrder(body, transaction) {
        const {orderData} = OrderProcessService.orderDataWrite(body)
        const order = await OrderDatabaseService.createOrder(orderData, transaction)
        await OrderProcessService.orderProductDataWrite(body, order.order_id, transaction)
        return order
    }

    static async listOrder(query) {
        const {orderSort} = OrderProcessService.orderDataList(query)
        const orders = await OrderDatabaseService.listOrder(orderSort)
        const countOrders = await OrderDatabaseService.countOrder()
        return {orders, countOrders}
    }

    static async showOrder(orderId) {
        return await OrderDatabaseService.showOrder(orderId)
    }

    static async cancelOrder(orderId, transaction) {
        await OrderDatabaseService.cancelOrder(orderId, transaction)
        const order = await OrderDatabaseService.showOrder(orderId)
        await OrderProcessService.updateProductCount(order.order_products, transaction)
        return order
    }

    static async completeOrder(orderId, transaction) {
        return await OrderDatabaseService.completeOrder(orderId, transaction)
    }

    static async getUserOrder(userId) {
        return await OrderDatabaseService.getUserOrder(userId)
    }

}

module.exports = {OrderBusinessService}