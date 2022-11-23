const {SequelizeConnect} = require("../../services/database-connect");
const {ProductBusinessService} = require("../../services/product-services/product.business.service")

class ProductController {

    static async createProduct(req, res, next) {
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

    static async listProduct(req, res, next) {
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

    static async showProduct(req, res, next) {
        try {
            const {id} = req.params;
            res.json('')
        } catch (err) {
            next(err)
        }
    }

    static async updateProduct(req, res, next) {
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

    static async deleteProduct(req, res, next) {
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

module.exports = {ProductController}