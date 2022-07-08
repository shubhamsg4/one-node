require("dotenv").config({ path: ".env" });
const { development, production } = require("../knexfile");
const db = require("knex")(
  process.env.NODE_ENV === "production" ? production : development
);

module.exports = db;