const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {product_features} = initModels(SequelizeConnect)

class ProductFeatureDatabaseService {

    static async createProductFeature(productFeatureData, transaction) {
        return product_features.create(
            productFeatureData, {
                transaction: transaction
            })
    }

    static async listProductFeature(productFeatureSort, transaction = null) {
        return await product_features.findAll({
            offset: productFeatureSort.offset,
            limit: productFeatureSort.limit,
            order: productFeatureSort.order,
            transaction: transaction
        })
    }

    static async showProductFeature(productFeatureId, transaction = null) {
        return await product_features.findOne({
            where: {
                product_feature_id: productFeatureId
            },
            transaction: transaction
        })
    }

    static async updateProductFeature(productFeatureData, productFeatureId, transaction) {
        return await product_features.update(
            productFeatureData, {
                where: {
                    product_feature_id: productFeatureId
                },
                returning: true,
                transaction: transaction
            })
    }

    static async deleteProductFeature(productFeatureId, transaction) {
        return await product_features.destroy({
            where: {
                product_feature_id: productFeatureId
            },
            transaction: transaction
        })
    }

    static async countProductFeature() {
        return await product_features.count()
    }

}

module.exports = {ProductFeatureDatabaseService}