const knex = require("knex");
const knexfile = require("./knexfile");
let env = process.env.NODE_ENV || "development";
env = env === "test" ? "development" : env;
module.exports = knex(knexfile[env]);
