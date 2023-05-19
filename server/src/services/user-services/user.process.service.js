const {ValidationService} = require("../validation.service");

class UserProcessService {

    static userDataWrite(query) {

        const userData = {
            user_email: query.user_email,
            user_name: query.user_name,
            user_phone_number: query.user_phone_number,
            is_admin: query.is_admin,
        }

        if (query.user_password) {
            userData.user_password = query.user_password
        }

        const userId = query.user_id;

        return  {userData, userId}
    }

    static userDataList(query) {

        const data = {
            user_id: query.user_id,
            user_email: query.user_email,
            user_name: query.user_name,
            user_phone_number: query.user_phone_number,
            is_admin: query.is_admin,
        }

        const userSort = {
            offset: query._offset || 0,
            limit: query._limit || null,
            order: [
                [(query._sort) ? `${query._sort}` : 'user_id', (query._order) ? `${query._order}` : 'ASC'],
            ],
        }

        const userData = ValidationService.clearData(data)
        return  {userData, userSort}
    }

    static favoriteProductDataWrite(query) {

        const favoriteProductData = {
            fk_user: query.fk_user,
            fk_product: query.fk_product,
        }

        const params = {
            is_favorite: query.is_favorite,
            is_basket: query.is_basket,
            basket_count: query.basket_count
        }

        const favoriteProductParams = ValidationService.clearData(params)
        return {favoriteProductData, favoriteProductParams}
    }

}

module.exports = {UserProcessService}