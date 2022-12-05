const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {products, product_features, product_feature_values, product_images, images} = initModels(SequelizeConnect)

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
            include: [{
                model: product_images,
                as: 'product_images',
                where: {
                    product_image_position: 'preview'
                },
                attributes: [
                    'product_image_position'
                ],
                include: [{
                    model: images,
                    as: 'image',
                    attributes: [
                        'image_path'
                    ]
                }]
            }],
            transaction: transaction
        })
    }

    static async showProduct(productId, transaction = null) {
        return await products.findOne({
            where: {
                product_id: productId
            },
            include: [{
                model: product_feature_values,
                as: 'product_feature_values',
                attributes: [
                    'product_features_values_value'
                ],
                include: [{
                    model: product_features,
                    as: 'product_feature',
                    attributes: [
                        'product_feature_name'
                    ]
                }],
            }, {
                model: product_images,
                as: 'product_images',
                attributes: [
                    'product_image_position'
                ],
                include: [{
                    model: images,
                    as: 'image',
                    attributes: [
                        'image_path'
                    ]
                }]
            }],
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