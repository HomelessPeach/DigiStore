const {SequelizeConnect} = require("../../services/database-connect");
const {ProductFeatureBusinessService} = require("../../services/product-feature-services/product-feature.business.service")

class ProductFeatureController {

    static async createProductFeature(req, res, next) {
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

    static async listProductFeature(req, res, next) {
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

    static async showProductFeature(req, res, next) {
        try {
            const {id} = req.params;
            res.json('')
        } catch (err) {
            next(err)
        }
    }

    static async updateProductFeature(req, res, next) {
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

    static async deleteProductFeature(req, res, next) {
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

module.exports = {ProductFeatureController}