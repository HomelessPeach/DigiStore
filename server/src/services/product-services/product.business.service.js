const {ProductDatabaseService} = require("./product.database.service");
const {ProductProcessService} = require("./product.process.service");
const {FileService} = require("../file-services/file.service");
const {folderPath} = require("../../../config/config");

class ProductBusinessService {

    static async getProducts(query) {
        const {productData} = ProductProcessService.productDataList(query)
        return await ProductDatabaseService.getProducts(productData)
    }

    static async getProduct(productId) {
        const productData = await ProductDatabaseService.getProduct(productId)
        const product = productData.get({plain: true})
        for (let i = 0; i < product.product_images.length; i++) {
            product.product_images[i].image_path = product.product_images[i].image.image_path
            delete product.product_images[i].image
        }
        return product
    }

    static async createProduct(body, files, transaction) {
        const {productData} = ProductProcessService.productDataWrite(body)
        const product = await ProductDatabaseService.createProduct(productData, transaction)

        for (let productFeatureValue of body.product_feature_values) {
            const {productFeaturesValueData} = ProductProcessService.productFeatureValueDataWrite(productFeatureValue, product.product_id)
            await ProductDatabaseService.createProductFeatureValue(productFeaturesValueData, transaction)
        }

        let preview = false

        if (files.previewSourceImage?.length) {
            const imageId = await FileService.createImage(files.previewSourceImage[0], folderPath.product, transaction)
            const {productImageData} = ProductProcessService.productImageDataWrite(product.product_id, imageId, true)
            await ProductDatabaseService.createProductImage(productImageData, transaction)
            preview = true
        }

        if (files.sourceImage?.length) {
            const imageIds = await FileService.createImages(files.sourceImage, folderPath.product, transaction)
            for (let i = 0; i < imageIds.length; i++) {
                const {productImageData} = ProductProcessService.productImageDataWrite(product.product_id, imageIds[i], !preview && i === 0)
                await ProductDatabaseService.createProductImage(productImageData, transaction)
            }
        }

        return product
    }

    static async listProduct(query) {
        const {productSort} = ProductProcessService.productDataList(query)
        const products = await ProductDatabaseService.listProduct(productSort)
        const countProducts = await ProductDatabaseService.countProduct()
        return {products, countProducts}
    }

    static async showProduct(productId) {
        const productData = await ProductDatabaseService.showProduct(productId)
        const product = productData.get({plain: true})
        for (let i = 0; i < product.product_images.length; i++) {
            product.product_images[i].image_path = product.product_images[i].image.image_path
            delete product.product_images[i].image
            if (product.product_images[i].product_image_position === 'preview') {
                product.product_images[i].is_preview = true
            }
        }
        return product
    }

    static async updateProduct(body, files, transaction) {
        const {productData, productId} = ProductProcessService.productDataWrite(body)
        const product = await ProductDatabaseService.updateProduct(productData, productId, transaction)
        await ProductDatabaseService.deleteProductFeatureValue(productId, transaction)
        for (let productFeatureValue of body.product_feature_values) {
            const {productFeaturesValueData} = ProductProcessService.productFeatureValueDataWrite(productFeatureValue, productId)
            await ProductDatabaseService.createProductFeatureValue(productFeaturesValueData, transaction)
        }

        let preview = false

        if (files.previewSourceImage?.length) {
            const imageId = await FileService.createImage(files.previewSourceImage[0], folderPath.product, transaction)
            const {productImageData} = ProductProcessService.productImageDataWrite(productId, imageId, true)
            await ProductDatabaseService.createProductImage(productImageData, transaction)
            preview = true
        }

        for (let image of body.product_images) {
            if (image.is_delete) {
                await ProductDatabaseService.deleteProductImage(productId, image.product_image_id, transaction)
                if (image?.image_path) {
                    await FileService.deleteImage(image.image_path, folderPath.product, transaction)
                        .catch((err) => console.error(err));
                }
            }
            if (image.is_preview && !preview) {
                const productImageData = {
                    product_image_position: 'preview'
                }
                await ProductDatabaseService.updateProductImage(productImageData, productId, image.product_image_id, transaction)
                preview = true
            }
            if (image.is_preview && preview) {
                const productImageData = {
                    product_image_position: null
                }
                await ProductDatabaseService.updateProductImage(productImageData, productId, image.product_image_id, transaction)
            }
        }

        if (files.sourceImage?.length) {
            const imageIds = await FileService.createImages(files.sourceImage, folderPath.product, transaction)
            for (let i = 0; i < imageIds.length; i++) {
                const {productImageData} = ProductProcessService.productImageDataWrite(productId, imageIds[i], !preview && i === 0)
                await ProductDatabaseService.createProductImage(productImageData, transaction)
            }
        }

        return product
    }

    static async deleteProduct(productId, transaction) {
        const productData = await ProductDatabaseService.showProduct(productId, transaction)
        const product = productData.get({plain: true})
        await ProductDatabaseService.deleteProductFeatureValue(productId, transaction)
        for (let image of product.product_images) {
            await ProductDatabaseService.deleteProductImage(productId, image.product_image_id, transaction)
            if (image.image?.image_path) {
                await FileService.deleteImage(image.image.image_path, folderPath.product, transaction)
                    .catch((err) => console.error(err));
            }
        }
        return await ProductDatabaseService.deleteProduct(productId, transaction)
    }

}

module.exports = {ProductBusinessService}