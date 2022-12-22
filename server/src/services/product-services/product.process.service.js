class ProductProcessService {

    static productDataWrite(query) {

        const productData = {
            product_name: query.product_name,
            product_description: query.product_description || null,
            product_rating: query.product_rating || 0,
            fk_product_category: query.fk_product_category || null,
            product_price: query.product_price,
            is_publish: query.is_publish || false
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

}

module.exports = {ProductProcessService}