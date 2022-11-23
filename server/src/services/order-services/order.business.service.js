const {OrderDatabaseService} = require("./order.database.service");
const {OrderProcessService} = require("./order.process.service");

class OrderBusinessService {

    static async createOrder() {
        return 1
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

    static async updateOrder() {
        return 1
    }

    static async deleteOrder(orderId) {
        return await OrderDatabaseService.deleteOrder(orderId)
    }

}

module.exports = {OrderBusinessService}