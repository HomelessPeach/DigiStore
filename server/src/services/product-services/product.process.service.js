class ProductProcessService {

    static productDataWrite() {

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