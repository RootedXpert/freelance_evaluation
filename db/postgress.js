const Sequalize = require("sequelize");
require("dotenv").config();

const database_name = process.env.DATABASE_NAME;
const database_password = process.env.DATABASE_PASSWORD;
const database_username = process.env.DATABASE_USERNAME;
const database_host = process.env.DATABASE_HOST;
const database_type = process.env.DATABASE_TYPE;
const sequelize = new Sequalize(
  database_name,
  database_username,
  database_password,
  {
    host: database_host,
    // due to unavalibilty of psql database used mysql please change bellow value to
    dialect: database_type,
  }
);

module.exports = sequelize;
