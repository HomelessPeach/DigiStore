class ProductFeatureProcessService {

    static productFeatureDataWrite() {

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