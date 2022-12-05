const {SequelizeConnect} = require('../database-connect')
const initModels = require('../../../models/init-models')
const {images} = initModels(SequelizeConnect)

class FileDatabaseService {

    static async createImage(imageData, transaction) {
        return images.create(
            imageData, {
                transaction: transaction
            }
        )
    }

    static async deleteImage(imagePath, transaction) {
        return await images.destroy({
            where: {
                image_path: imagePath
            },
            transaction: transaction
        })
    }

}

module.exports = {FileDatabaseService}