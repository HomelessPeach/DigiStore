const {ProductCategoryDatabaseService} = require("./product-category.database.service");
const {ProductCategoryProcessService} = require("./product-category.process.service");

class ProductCategoryBusinessService {

    static async createProductCategory() {
        return 1
    }

    static async listProductCategory(query) {
        const {productCategorySort} = ProductCategoryProcessService.productCategoryDataList(query)
        const productCategories = await ProductCategoryDatabaseService.listProductCategory(productCategorySort)
        const countProductCategories = await ProductCategoryDatabaseService.countProductCategory()
        return {productCategories, countProductCategories}
    }

    static async showProductCategory(productCategoryId) {
        return await ProductCategoryDatabaseService.showProductCategory(productCategoryId)
    }

    static async updateProductCategory() {
        return 1
    }

    static async deleteProductCategory(productCategoryId) {
        return await ProductCategoryDatabaseService.deleteProductCategory(productCategoryId)
    }

}

module.exports = {ProductCategoryBusinessService}