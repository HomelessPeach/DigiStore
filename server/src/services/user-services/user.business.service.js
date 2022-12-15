const {UserDatabaseService} = require("./user.database.service");
const {UserProcessService} = require("./user.process.service");
const {FileService} = require("../file-services/file.service");
const {folderPath} = require("../../../config/config")

class UserBusinessService {

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
        const userData = await UserDatabaseService.showUser(userId)
        const user = userData.get({plain: true})
        await UserDatabaseService.deleteUserFromChat(userId, transaction)
        await UserDatabaseService.deleteUserFromFavoriteProducts(userId, transaction)
        await UserDatabaseService.deleteUserFromOrder(userId, transaction)
        await UserDatabaseService.deleteUserFromReview(userId, transaction)
        const deleteUser = await UserDatabaseService.deleteUser(userId, transaction)
        if (user.image?.image_path) {
            await FileService.deleteImage(user.image.image_path, folderPath.user, transaction)
                .catch((err) => console.error(err));
        }
        return deleteUser
    }

}

module.exports = {UserBusinessService}