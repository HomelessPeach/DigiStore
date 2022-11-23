const {ProductFeatureDatabaseService} = require("./product-feature.database.service");
const {ProductFeatureProcessService} = require("./product-feature.process.service");

class ProductFeatureBusinessService {

    static async createProductFeature() {
        return 1
    }

    static async listProductFeature(query) {
        const {productFeatureSort} = ProductFeatureProcessService.productFeatureDataList(query)
        const products = await ProductFeatureDatabaseService.listProductFeature(productFeatureSort)
        const countProducts = await ProductFeatureDatabaseService.countProductFeature()
        return {products, countProducts}
    }

    static async showProductFeature(productFeatureId) {
        return await ProductFeatureDatabaseService.showProductFeature(productFeatureId)
    }

    static async updateProductFeature() {
        return 1
    }

    static async deleteProductFeature(productFeatureId) {
        return await ProductFeatureDatabaseService.showProductFeature(productFeatureId)
    }

}

module.exports = {ProductFeatureBusinessService}