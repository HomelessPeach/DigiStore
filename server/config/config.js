require('dotenv').config();
const path = require("path")

module.exports = {
    application: {
        domain: 'http://www.digital-store.pro',
        port: 8081,
        accessTokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
        cors: {
            whiteList: [
                'http://localhost:3000',
                'http://localhost:8081',
                'http://www.digital-store.pro'
            ],
        }
    },
    database: {
        dialect: 'sqlite',
        storage: path.join('../', 'DigiStore.sqlite'),
    },
    mailOptions: {
        host: 'smtp.mail.ru',
        port: 465,
        login: 'digi.store@mail.ru',
        password: 'rusiZKFBJ2kgsubxrxaU'
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