const {UserDatabaseService} = require("./user.database.service");
const {UserProcessService} = require("./user.process.service");
const {FileService} = require("../file-services/file.service");
const {folderPath} = require("../../../config/config")
const {AuthProcessService} = require("../auth-services/auth.process.service");

class UserBusinessService {

    static async createSimpleUser(body, transaction) {
        const {userData} = UserProcessService.userDataWrite(body)
        await AuthProcessService.isUserExist(userData, transaction)
        return await UserDatabaseService.createUser(userData, transaction);
    }

    static async createUser(body, files, transaction) {
        const {userData} = UserProcessService.userDataWrite(body)
        if (files.sourceImage?.length) {
            const image = await FileService.createImage(files.sourceImage[0], folderPath.user, transaction)
            userData.fk_image = image.image_id
        }
        return await UserDatabaseService.createUser(userData, transaction);
    }

    static async listUser(query) {
        const {userSort} = UserProcessService.userDataList(query)
        const users = await UserDatabaseService.listUser(userSort)
        const countUsers = await UserDatabaseService.countUser()
        return {users, countUsers}
    }

    static async showUser(userId) {
        return await UserDatabaseService.showUser(userId)
    }

    static async updateUser(body, files, transaction) {
        const {userData, userId} = UserProcessService.userDataWrite(body)
        if (files.sourceImage?.length) {
            const image = await FileService.createImage(files.sourceImage[0], folderPath.user, transaction)
            userData.fk_image = image.image_id
        }
        const user = await UserDatabaseService.updateUser(userData, userId, transaction);
        if (userData.fk_image && body.image?.image_path) {
            await FileService.deleteImage(body.image.image_path, folderPath.user, transaction)
                .catch((err) => console.error(err));
        }
        return user
    }

    static async deleteUser(userId, transaction) {
        const userData = await UserDatabaseService.showUser(userId, transaction)
        const user = userData.get({plain: true})
        await UserDatabaseService.deleteUserFromChat(userId, transaction)
        await UserDatabaseService.deleteUserFavoriteProducts(userId, transaction)
        await UserDatabaseService.deleteUserFromOrder(userId, transaction)
        await UserDatabaseService.deleteUserFromReview(userId, transaction)
        const deleteUser = await UserDatabaseService.deleteUser(userId, transaction)
        if (user.image?.image_path) {
            await FileService.deleteImage(user.image.image_path, folderPath.user, transaction)
                .catch((err) => console.error(err));
        }
        return deleteUser
    }

    static async setUserFavoriteProduct(query, transaction) {
        const {favoriteProductData, favoriteProductParams} = UserProcessService.favoriteProductDataWrite(query)
        const findFavoriteProduct = await UserDatabaseService.getFavoriteProduct(favoriteProductData.fk_user, favoriteProductData.fk_product, transaction)
        if (!findFavoriteProduct && Object.keys(favoriteProductParams).length) {
            await UserDatabaseService.addUserFavoriteProduct({...favoriteProductData, ...favoriteProductParams}, transaction)
            return;
        }
        if ((favoriteProductParams.is_favorite === false && findFavoriteProduct.is_basket == 0) ||
            (favoriteProductParams.is_basket === false && findFavoriteProduct.is_favorite == 0)
        ) {
            await UserDatabaseService.deleteUserFavoriteProduct(favoriteProductData.fk_user, favoriteProductData.fk_product, transaction)
            return;
        }
        await UserDatabaseService.updateUserFavoriteProduct(favoriteProductParams, favoriteProductData.fk_user, favoriteProductData.fk_product, transaction)
    }

    static async getUserProducts(userId) {
        const wishList = await UserDatabaseService.getUserProductFavorite(userId)
        const basket = await UserDatabaseService.getUserProductInBasket(userId)
        return {basket, wishList}
    }

}

module.exports = {UserBusinessService}