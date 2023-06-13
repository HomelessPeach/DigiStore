const {SequelizeConnect} = require("../../services/database-connect");
const {OrderBusinessService} = require("../../services/order-services/order.business.service")

class OrderController {

    static async addOrder(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body} = req;
            const order = await OrderBusinessService.addOrder(body, transaction)
            await transaction.commit();
            res.json(order)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listOrder(req, res, next) {
        try {
            const {query} = req
            const {orders, countOrders} = await OrderBusinessService.listOrder(query)
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${countOrders}`)
                .json(orders)
        } catch (err) {
            next(err)
        }
    }

    static async showOrder(req, res, next) {
        try {
            const {id} = req.params;
            const order = await OrderBusinessService.showOrder(id)
            res.json(order)
        } catch (err) {
            next(err)
        }
    }

    static async cancelOrder(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;
            await OrderBusinessService.cancelOrder(id, transaction)
            await transaction.commit();
            res.json(`Заказ отменён`)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async completeOrder(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;
            await OrderBusinessService.completeOrder(id, transaction)
            await transaction.commit();
            res.json(`Заказ выполнен`)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }

    }

    static async getUserOrder(req, res, next) {
        try {
            const {id} = req.params;
            const orders = await OrderBusinessService.getUserOrder(id)
            res.json(orders)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = {OrderController}