require("dotenv").config();
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbProdUsername = process.env.DBPROD_USERNAME;
const dbProdPassword = process.env.DBPROD_PASSWORD;
const dbProdName = process.env.DBPROD_NAME;
const dbProdHost = process.env.DBPROD_HOST;

module.exports = {
  development: {
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: dbUsername,
    password: dbPassword,
    database: "test",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: dbProdUsername,
    password: dbProdPassword,
    database: dbProdName,
    host: dbProdHost,
    dialect: "postgres",
    operatorsAliases: false
  }
};
