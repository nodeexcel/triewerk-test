const { Sequelize } = require("sequelize");
require('dotenv').config()
const sequelizeConnection = new Sequelize('trieb_Test', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});



module.exports = { sequelizeConnection, Sequelize };