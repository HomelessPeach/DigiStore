class ProductCategoryProcessService {

    static productCategoryDataWrite() {

    }

    static productCategoryDataList(query) {

        const productCategoryData = {

        }

        const productCategorySort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'product_category_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {productCategorySort}
    }

}

module.exports = {ProductCategoryProcessService}