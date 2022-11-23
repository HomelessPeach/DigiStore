const {SequelizeConnect} = require("../../services/database-connect");
const {ProductCategoryBusinessService} = require("../../services/product-category-services/product-category.business.service")

class ProductCategoryController {

    static async createProductCategory(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;

            await transaction.commit();
            res.json('')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listProductCategory(req, res, next) {
        try {
            const {query} = req
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${1}`)
                .json('')
        } catch (err) {
            next(err)
        }
    }

    static async showProductCategory(req, res, next) {
        try {
            const {id} = req.params;
            res.json('')
        } catch (err) {
            next(err)
        }
    }

    static async updateProductCategory(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            await transaction.commit();

            res.json('')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async deleteProductCategory(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;

            await transaction.commit();
            res.json('Данные удалены')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {ProductCategoryController}