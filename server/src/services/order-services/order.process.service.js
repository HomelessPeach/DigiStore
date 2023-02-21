const {v4} = require('uuid')
const {OrderDatabaseService} = require("./order.database.service");
const {ApiError} = require("../../errors/api.error");
const {ProductDatabaseService} = require("../product-services/product.database.service");

class OrderProcessService {

    static orderDataWrite(query) {

        if (!query?.products?.length) {
            throw ApiError.BadRequest('Пустой заказ')
        }

        const orderData = {
            order_number: (v4()).replace(/-/g, '').toUpperCase().slice(0, 10),
            fk_user: query.user_id,
            client_phone_number: query.client_phone_number,
            client_email: query.client_email,
            client_name: query.client_name
        }

        return {orderData}
    }

    static async orderProductDataWrite(query, orderId, transaction) {
        const {products} = query
        for (let product of products) {
            const productData = {
                fk_order: orderId,
                fk_product: product.id,
                order_product_count: product.count,
            }
            const checkProductData = await ProductDatabaseService.showProduct(product.id, transaction)

            if (product.price !== checkProductData.product_price)
                throw ApiError.BadRequest('Ошибка при создание заказа')

            productData.order_product_price = checkProductData.product_price
            productData.order_product_name = checkProductData.product_name
            await OrderDatabaseService.createProductOrder(productData, transaction)
        }
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