// src/utils/db.js
const pg = require('pg');

// ❌ Hardcoded database credentials
const pool = new pg.Pool({
  host:     'localhost',
  database: 'myapp_prod',
  user:     'postgres',
  password: 'postgres123',
  port:      5432,
});

// ❌ No error handling in async function
async function query(sql, params) {
  const result = await pool.query(sql, params);
  return result.rows;
}

// ❌ Unused variable
const unusedDbVersion = "14.2";

module.exports = { query, pool };
