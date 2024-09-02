require('dotenv').config()

module.exports = {
  apiVersion: process.env.API_VERSION || 1,

  pgsql_host: process.env.PGSQL_HOST,
  pgsql_port: process.env.PGSQL_PORT,
  pgsql_user: process.env.PGSQL_USER,
  pgsql_pass: process.env.PGSQL_PASS,
  pgsql_db: process.env.PGSQL_DB,
};