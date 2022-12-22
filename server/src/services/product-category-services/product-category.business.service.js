const {ProductCategoryDatabaseService} = require("./product-category.database.service");
const {ProductCategoryProcessService} = require("./product-category.process.service");
const {FileService} = require("../file-services/file.service");
const {folderPath} = require("../../../config/config");

class ProductCategoryBusinessService {

    static async getProductCategories(query) {
        return await ProductCategoryDatabaseService.getProductCategories()
    }

    static async createProductCategory(body, files, transaction) {
        const {productCategoryData} = ProductCategoryProcessService.productCategoryDataWrite(body)
        if (files.sourceImage?.length) {
            const image = await FileService.createImage(files.sourceImage[0], folderPath.productCategory, transaction)
            productCategoryData.fk_image = image.image_id
        }
        return await ProductCategoryDatabaseService.createProductCategory(productCategoryData, transaction)
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

    static async updateProductCategory(body, files, transaction) {
        const {productCategoryData, productCategoryId} = ProductCategoryProcessService.productCategoryDataWrite(body)
        if (files.sourceImage?.length) {
            const image = await FileService.createImage(files.sourceImage[0], folderPath.productCategory, transaction)
            productCategoryData.fk_image = image.image_id
        }
        const productCategory = await ProductCategoryDatabaseService.updateProductCategory(productCategoryData, productCategoryId, transaction)
        if (productCategoryData.fk_image && body.image?.image_path) {
            await FileService.deleteImage(body.image.image_path, folderPath.productCategory, transaction)
                .catch((err) => console.error(err));
        }
        return productCategory
    }

    static async deleteProductCategory(productCategoryId, transaction) {
        const productCategoryData = await ProductCategoryDatabaseService.showProductCategory(productCategoryId, transaction)
        const productCategory = productCategoryData.get({plain: true})
        const deleteProductCategory = await ProductCategoryDatabaseService.deleteProductCategory(productCategoryId, transaction)
        if (productCategory.image?.image_path) {
            await FileService.deleteImage(productCategory.image.image_path, folderPath.productCategory, transaction)
                .catch((err) => console.error(err));
        }
        return deleteProductCategory
    }

}

module.exports = {ProductCategoryBusinessService}