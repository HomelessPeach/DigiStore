require('dotenv').config();
const path = require("path")

module.exports = {
    application: {
        domain: 'localhost',
        port: 8081,
        accessTokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
        cors: {
            whiteList: [
                'http://localhost:3000',
                'http://localhost:8081',
            ],
        }
    },
    database: {
        dialect: 'sqlite',
        storage: path.join('../', 'DigiStore.sqlite'),
    },
    paths: {
        readPath: path.join('/', 'files'),
        writePath: path.join('./', 'src', 'public', 'files'),
    },
    folderPath: {
        user: path.join('/', 'user'),
        product: path.join('/', 'product'),
        productCategory: path.join('/', 'product-category'),
        news: path.join('/', 'news'),
    }
}