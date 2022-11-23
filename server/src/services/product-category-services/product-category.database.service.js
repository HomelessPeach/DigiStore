const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {product_categories} = initModels(SequelizeConnect)

class ProductCategoryDatabaseService {

    static async createProductCategory(productCategoryData, transaction) {
        return product_categories.create(
            productCategoryData, {
                transaction: transaction
            })
    }

    static async listProductCategory(productCategorySort, transaction = null) {
        return await product_categories.findAll({
            offset: productCategorySort.offset,
            limit: productCategorySort.limit,
            order: productCategorySort.order,
            transaction: transaction
        })
    }

    static async showProductCategory(productCategoryId, transaction = null) {
        return await product_categories.findOne({
            where: {
                product_category_id: productCategoryId
            },
            transaction: transaction
        })
    }

    static async updateProductCategory(productCategoryData, productCategoryId, transaction) {
        return await product_categories.update(
            productCategoryData, {
                where: {
                    product_category_id: productCategoryId
                },
                returning: true,
                transaction: transaction
            })
    }

    static async deleteProductCategory(productCategoryId, transaction) {
        return await product_categories.destroy({
            where: {
                product_category_id: productCategoryId
            },
            transaction: transaction
        })
    }

    static async countProductCategory() {
        return await product_categories.count()
    }

}

module.exports = {ProductCategoryDatabaseService}