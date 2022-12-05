const path = require("path")
const {v4} = require("uuid");
const {promises: fs} = require("fs");
const {paths} = require("../../../config/config")
const {FileDatabaseService} = require("./file.database.service")

class FileService {

    static async downloadImage(file, recourse) {
        const writeImagePath = path.join(paths.writePath, recourse, 'image');
        const readImagePath = path.join(paths.readPath, recourse, 'image');
        await fs.mkdir(writeImagePath, {recursive: true});
        const mimetype = file.mimetype.replace(/^.*\//g, '');
        const filename = `${v4()}.${mimetype}`;
        await fs.writeFile(path.join(writeImagePath, filename), file.buffer);
        return  {
            image_path: `${readImagePath}/${filename}`,
        };
    }

    static async createImage(file, recourse, transaction) {
        const imageData = await FileService.downloadImage(file, recourse)
        return await FileDatabaseService.createImage(imageData, transaction)
    }

    static async createImages(files, recourse, transaction) {
        const imageIds = []
        for (let file of files) {
            const image = await FileDatabaseService.createImage(file, recourse, transaction)
            imageIds.push(image.image_id)
        }
        return imageIds
    }

    static async eraseImage(fileName, recourse) {
        const imagePath = path.join(paths.writePath, recourse, 'image', fileName)
        await fs.unlink(imagePath);
    }

    static async deleteImage(filePath, recourse, transaction) {
        const fileName = path.basename(filePath)
        await FileService.eraseImage(fileName, recourse)
        return await FileDatabaseService.deleteImage(filePath, transaction)
    }

}

module.exports = {FileService}