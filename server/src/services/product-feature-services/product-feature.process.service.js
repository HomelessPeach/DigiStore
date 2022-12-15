class ProductFeatureProcessService {

    static productFeatureDataWrite(query) {

        const productFeatureData = {
            product_feature_name: query.product_feature_name,
        }

        const productFeatureId = query.product_feature_id;

        return  {productFeatureData, productFeatureId}
    }

    static productFeatureDataList(query) {

        const productFeatureData = {
        }

        const productFeatureSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'product_feature_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {productFeatureSort}
    }

}

module.exports = {ProductFeatureProcessService}