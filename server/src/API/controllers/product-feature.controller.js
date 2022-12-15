const {SequelizeConnect} = require("../../services/database-connect");
const {ProductFeatureBusinessService} = require("../../services/product-feature-services/product-feature.business.service")

class ProductFeatureController {

    static async createProductFeature(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body} = req;
            const productFeature = await ProductFeatureBusinessService.createProductFeature(body, transaction)
            await transaction.commit();
            res.json(productFeature)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listProductFeature(req, res, next) {
        try {
            const {query} = req
            const {productFeatures, countProductFeatures} = await ProductFeatureBusinessService.listProductFeature(query)
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${countProductFeatures}`)
                .json(productFeatures)
        } catch (err) {
            next(err)
        }
    }

    static async showProductFeature(req, res, next) {
        try {
            const {id} = req.params;
            const productFeature = await ProductFeatureController.showProductFeature(id)
            res.json(productFeature)
        } catch (err) {
            next(err)
        }
    }

    static async updateProductFeature(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body} = req;
            const productFeature = await ProductFeatureBusinessService.updateProductFeature(body, transaction)
            await transaction.commit();
            res.json(productFeature)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async deleteProductFeature(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;
            await ProductFeatureBusinessService.deleteProductFeature(id, transaction)
            await transaction.commit();
            res.json('Данные удалены')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {ProductFeatureController}