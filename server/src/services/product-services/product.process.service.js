const {ProductDatabaseService} = require("./product.database.service");

class ProductProcessService {

    static productDataWrite(query) {

        const productData = {
            product_name: query.product_name,
            product_description: query.product_description || null,
            product_rating: query.product_rating || 0,
            fk_product_category: query.fk_product_category || null,
            product_price: query.product_price,
            is_publish: query.is_publish || false,
            in_stock: query.in_stock || null
        }

        const productId = query.product_id;

        return  {productData, productId}
    }

    static productDataList(query) {

        const productData = {
            fk_product_category: query.fk_product_category
        }

        const productSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'product_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {productData, productSort}
    }

    static productFeatureValueDataWrite(query, productId) {

        const productFeaturesValueData = {
            product_features_values_value: query.product_features_values_value,
            fk_product_feature: query.fk_product_feature,
            fk_product: productId
        }

        return {productFeaturesValueData}
    }

    static productImageDataWrite(productId, imageId, isPreview) {

        const productImageData = {
            product_image_position: (isPreview)? 'preview': null,
            fk_image: imageId,
            fk_product: productId
        }

        return {productImageData}
    }

    static productReviewDataWrite(query) {

        const reviewData = {
            fk_user: query.fk_user,
            fk_product: query.fk_product,
            review_rating: query.review_rating,
            review_description: query.review_description || null,
            create_at: query.create_at || null
        }

        const reviewId = query.review_id;

        return  {reviewData, reviewId}
    }

    static async productMarkUpdate(productId, transaction) {
        const reviews = await ProductDatabaseService.getAllProductMarks(productId, transaction)
        const rating = reviews.reduce((sum, item) => sum + item.review_rating, 0)/reviews.length
        await ProductDatabaseService.updateProduct({product_rating: (rating)? rating: 0}, productId, transaction)
    }

    static getBasketProduct(productsData) {
        const products = []
        for (let product of productsData) {
            products.push({
                id: product.product_id,
                image: product?.product_images[0]?.image?.image_path,
                name: product.product_name,
                price: product.product_price,
                in_stock: product.in_stock,
                count: product.in_stock
            })
        }
        return products
    }

}

module.exports = {ProductProcessService}