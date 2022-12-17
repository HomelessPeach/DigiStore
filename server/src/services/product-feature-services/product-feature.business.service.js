const {ProductFeatureDatabaseService} = require("./product-feature.database.service");
const {ProductFeatureProcessService} = require("./product-feature.process.service");

class ProductFeatureBusinessService {

    static async createProductFeature(body, transaction) {
        const {productFeatureData} = ProductFeatureProcessService.productFeatureDataWrite(body)
        return await ProductFeatureDatabaseService.createProductFeature(productFeatureData, transaction)
    }

    static async listProductFeature(query) {
        const {productFeatureSort} = ProductFeatureProcessService.productFeatureDataList(query)
        const productFeatures = await ProductFeatureDatabaseService.listProductFeature(productFeatureSort)
        const countProductFeatures = await ProductFeatureDatabaseService.countProductFeature()
        return {productFeatures, countProductFeatures}
    }

    static async showProductFeature(productFeatureId) {
        return await ProductFeatureDatabaseService.showProductFeature(productFeatureId)
    }

    static async updateProductFeature(body, transaction) {
        const {productFeatureData, productFeatureId} = ProductFeatureProcessService.productFeatureDataWrite(body)
        return await ProductFeatureDatabaseService.updateProductFeature(productFeatureData, productFeatureId, transaction)
    }

    static async deleteProductFeature(productFeatureId, transaction) {
        return await ProductFeatureDatabaseService.showProductFeature(productFeatureId, transaction)
    }

}

module.exports = {ProductFeatureBusinessService}