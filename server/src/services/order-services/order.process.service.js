class OrderProcessService {

    static orderDataWrite() {

    }

    static orderDataList(query) {

        const orderData = {
        }

        const orderSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'order_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }
        return {orderSort}
    }

}

module.exports = {OrderProcessService}