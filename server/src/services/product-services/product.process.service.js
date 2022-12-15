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

        }

        const productSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'product_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {productSort}
    }

}

module.exports = {ProductProcessService}