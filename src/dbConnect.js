require('dotenv').config();
const { Pool } = require('pg');

const client = new Pool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  port: process.env.RDS_PORT,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
});

client.connect();

module.exports = client;
