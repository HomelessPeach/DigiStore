const {SequelizeConnect} = require("../../services/database-connect");
const {ProductBusinessService} = require("../../services/product-services/product.business.service")

class ProductController {

    static async createProduct(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            const body = JSON.parse(data);
            const product = await ProductBusinessService.createProduct(body, files, transaction)
            await transaction.commit();
            res.json(product)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listProduct(req, res, next) {
        try {
            const {query} = req
            const {products, countProducts} = await ProductBusinessService.listProduct(query)
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${countProducts}`)
                .json(products)
        } catch (err) {
            next(err)
        }
    }

    static async showProduct(req, res, next) {
        try {
            const {id} = req.params;
            const product = await ProductBusinessService.showProduct(id)
            res.json(product)
        } catch (err) {
            next(err)
        }
    }

    static async updateProduct(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            const body = JSON.parse(data);
            const product = await ProductBusinessService.updateProduct(body, files, transaction)
            await transaction.commit();
            res.json(product)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;
            await ProductBusinessService.deleteProduct(id, transaction)
            await transaction.commit();
            res.json('Данные удалены')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {ProductController}