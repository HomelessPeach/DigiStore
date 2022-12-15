const {ProductDatabaseService} = require("./product.database.service");
const {ProductProcessService} = require("./product.process.service");
const {FileService} = require("../file-services/file.service");
const {folderPath} = require("../../../config/config");

class ProductBusinessService {

    static async createProduct(body, files, transaction) {
        const {productData} = ProductProcessService.productDataWrite()
        const product = await ProductDatabaseService.createProduct(productData, transaction)
        return product
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

    static async updateProduct(body, files, transaction) {
        const {productData, productId} = ProductProcessService.productDataWrite()
        const product = await ProductDatabaseService.updateProduct(productData, productId, transaction)
        return product
    }

    static async deleteProduct(productId, transaction) {
        return await ProductDatabaseService.deleteProduct(productId, transaction)
    }

}

module.exports = {ProductBusinessService}