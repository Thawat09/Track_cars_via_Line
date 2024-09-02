const { Pool } = require('pg');
const config = require("../config/app");

const pool = new Pool({
  user: config.pgsql_user,
  host: config.pgsql_host,
  database: config.pgsql_db,
  password: config.pgsql_pass,
  port: 5432,
});

module.exports = { pool };