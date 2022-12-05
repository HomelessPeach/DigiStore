require('dotenv').config();
const path = require("path")

module.exports = {
    application: {
        domain: 'localhost',
        port: 8081,
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
    }
}