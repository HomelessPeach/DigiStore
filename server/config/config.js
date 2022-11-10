require('dotenv').config();

module.exports = {
    application: {
        domain: 'localhost',
        port: 8081,
    },
    database: {
        dialect: 'sqlite',
        storage: '../DigiStore.sqlite'
    }
}