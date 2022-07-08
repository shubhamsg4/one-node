require("dotenv").config({ path: ".env" });
const { DB_NAME, DB_USER, DB_HOST, DB_PASS, DB_DRIVER, DB_PORT, DB_TIMEZONE } =
  process.env;

module.exports = {
  development: {
    client: DB_DRIVER,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
      charset: "utf8mb4",
    },
  },

  staging: {
    client: DB_DRIVER,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
      charset: "utf8mb4",
    },
  },

  production: {
    client: DB_DRIVER,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
      charset: "utf8mb4",
      timezone: DB_TIMEZONE,
    },
  },
};
