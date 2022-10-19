const {Sequelize} = require('sequelize')
const {database} = require('../../config/config')

const SequelizeConnect = new Sequelize({
    dialect: database.dialect,
    storage: database.storage
})

module.exports = {SequelizeConnect}