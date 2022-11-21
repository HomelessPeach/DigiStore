const {UserDatabaseService} = require("../../services/user-services/user.database.service");
const {SequelizeConnect} = require("../../services/database-connect");
const {UserBusinessService} = require("../../services/user-services/user.business.service");

class UserController {

    static async createUser(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            const user = await UserBusinessService.createUser()
            await transaction.commit();
            res.json(user)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async listUser(req, res, next) {
        try {
            const {query} = req
            const {users, countUsers} = await UserBusinessService.listUser(query)
            res
                .set('Access-Control-Expose-Headers', 'X-Total-Count')
                .set('X-Total-Count', `${countUsers}`)
                .json(users)
        } catch (err) {
            next(err)
        }
    }

    static async showUser(req, res, next) {
        try {
            const {id} = req.params;
            const user = await UserBusinessService.showUser(id)
            res.json(user)
        } catch (err) {
            next(err)
        }
    }

    static async updateUser(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {body: {data}, files} = req;
            const user = await UserBusinessService.updateUser()
            await transaction.commit();
            res.json(user)
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        const transaction = await SequelizeConnect.transaction()
        try {
            const {id} = req.params;
            await UserBusinessService.deleteUser()
            await transaction.commit();
            res.json('Данные удалены')
        } catch (err) {
            await transaction.rollback();
            next(err)
        }
    }

}

module.exports = {UserController}