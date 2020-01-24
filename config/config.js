require("dotenv").config();
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

module.exports = {
  development: {
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: dbUsername,
    password: dbPassword,
    database: "twitter_automator_test",
    host: dbHost,
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    use_env_variable: "DATABASE_URL",
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: "postgres",
    operatorsAliases: false
  }
};
