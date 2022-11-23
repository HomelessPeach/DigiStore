const {ProductDatabaseService} = require("./product.database.service");
const {ProductProcessService} = require("./product.process.service");

class ProductBusinessService {

    static async createProduct() {
        return 1
    }

    static async listProduct(query) {
        const {productSort} = ProductProcessService.productDataList(query)
        const products = await ProductDatabaseService.listProduct(productSort)
        const countProducts = await ProductDatabaseService.countProduct()
        return {products, countProducts}
    }

    static async showProduct(productId) {
        return await ProductDatabaseService.showProduct(productId)
    }

    static async updateProduct() {
        return 1
    }

    static async deleteProduct(productId) {
        return await ProductDatabaseService.deleteProduct(productId)
    }

}

module.exports = {ProductBusinessService}