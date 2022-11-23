const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {products} = initModels(SequelizeConnect)

class ProductDatabaseService {

    static async createProduct(productData, transaction) {
        return products.create(
            productData, {
                transaction: transaction
            })
    }

    static async listProduct(productSort, transaction = null) {
        return await products.findAll({
            offset: productSort.offset,
            limit: productSort.limit,
            order: productSort.order,
            transaction: transaction
        })
    }

    static async showProduct(productId, transaction = null) {
        return await products.findOne({
            where: {
                product_id: productId
            },
            transaction: transaction
        })
    }

    static async updateProduct(productData, productId, transaction) {
        return await products.update(
            productData, {
                where: {
                    product_id: productId
                },
                returning: true,
                transaction: transaction
            })
    }

    static async deleteProduct(productId, transaction) {
        return await products.destroy({
            where: {
                product_id: productId
            },
            transaction: transaction
        })
    }

    static async countProduct() {
        return await products.count()
    }

}

module.exports = {ProductDatabaseService}