const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {products, product_features, product_feature_values, product_images, images} = initModels(SequelizeConnect)

class ProductDatabaseService {

    static async getProducts(productData, transaction = null) {
        return await products.findAll({
            where: {...productData, is_publish: true},
            order: [['product_id', 'DESC']],
            attributes: [
                'product_id',
                'product_name',
                'product_description',
                'product_price',
                'product_rating',
            ],
            include: [{
                model: product_images,
                as: 'product_images',
                where: {
                    product_image_position: 'preview'
                },
                attributes: [
                    'product_image_id',
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

    static async getProduct(productId, transaction = null) {
        return await products.findOne({
            where: {
                product_id: productId,
                is_publish: true
            },
            attributes: [
                'product_id',
                'product_name',
                'product_description',
                'product_price',
                'product_rating',
            ],
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
                }]
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

    static async getProductsForCarousel(transaction = null) {
        return await products.findAll({
            offset: 0,
            limit: 5,
            order: [['product_id', 'DESC']],
            where: {
                is_publish: true
            },
            attributes: [
                'product_id',
                'product_name',
            ],
            include: [{
                model: product_images,
                as: 'product_images',
                where: {
                    product_image_position: 'preview'
                },
                attributes: [
                    'product_image_id',
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
            attributes: [
                'product_id',
                'product_name',
                'is_publish',
                'product_rating',
            ],
            transaction: transaction
        })
    }

    static async showProduct(productId, transaction = null) {
        return await products.findOne({
            where: {
                product_id: productId
            },
            attributes: [
                'product_id',
                'product_name',
                'product_description',
                'fk_product_category',
                'product_price',
                'is_publish',
                'product_rating',
            ],
            include: [{
                model: product_feature_values,
                as: 'product_feature_values',
                attributes: [
                    'fk_product_feature',
                    'product_features_values_value'
                ],
            }, {
                model: product_images,
                as: 'product_images',
                attributes: [
                    'product_image_id',
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

    static async createProductFeatureValue(productFeatureData, transaction) {
        return product_feature_values.create(
            productFeatureData, {
                transaction: transaction
            })
    }

    static async deleteProductFeatureValue(productId, transaction) {
        return await product_feature_values.destroy({
            where: {
                fk_product: productId
            },
            transaction: transaction
        })
    }

    static async createProductImage(productImageData, transaction) {
        return product_images.create(
            productImageData, {
                transaction: transaction
            })
    }

    static async updateProductImage(productImageData, productId, imageId, transaction) {
        return await products.update(
            productImageData, {
                where: {
                    fk_product: productId,
                    fk_image: imageId
                },
                returning: true,
                transaction: transaction
            })
    }

    static async deleteProductImage(productId, imageId, transaction) {
        return await product_images.destroy({
            where: {
                fk_product: productId,
                fk_image: imageId
            },
            transaction: transaction
        })
    }

}

module.exports = {ProductDatabaseService}