const {SequelizeConnect} = require("../../services/database-connect");
const {OrderBusinessService} = require("../../services/order-services/order.business.service")

class OrderController {

    static async createOrder(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;

            await transaction.commit();
            res.json('')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listOrder(req, res, next) {
        try {
            const {query} = req
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${1}`)
                .json('')
        } catch (err) {
            next(err)
        }
    }

    static async showOrder(req, res, next) {
        try {
            const {id} = req.params;
            res.json('')
        } catch (err) {
            next(err)
        }
    }

    static async updateOrder(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            await transaction.commit();

            res.json('')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async deleteOrder(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;

            await transaction.commit();
            res.json('Данные удалены')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {OrderController}