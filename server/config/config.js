require('dotenv').config();
const path = require('path')

module.exports = {
    database: {
        dialect: 'sqlite',
        storage: '../DigiStore.sqlite'
    }
}