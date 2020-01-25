require("dotenv").config();
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

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
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  }
};
