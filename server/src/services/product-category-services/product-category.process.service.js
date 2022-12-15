class ProductCategoryProcessService {

    static productCategoryDataWrite(query) {

        const productCategoryData = {
            product_category_name: query.product_category_name,
        }

        const productCategoryId = query.product_category_id;

        return  {productCategoryData, productCategoryId}
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