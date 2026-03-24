// src/models/user.js
const db   = require('../utils/db');
const crypto = require('crypto');

// ❌ No error handling in async functions throughout
async function findById(id) {
  const rows = await db.query(`SELECT * FROM users WHERE id = ${id}`);
  return rows[0];
}

async function findByEmail(email) {
  // ❌ SQL injection
  const rows = await db.query("SELECT * FROM users WHERE email = '" + email + "'");
  return rows[0];
}

async function create(userData) {
  const { username, email, password, role } = userData;

  // ❌ MD5 password hashing
  const hash = crypto.createHash('md5').update(password).digest('hex');

  // ❌ SQL injection in INSERT
  await db.query(
    `INSERT INTO users (username, email, password, role)
     VALUES ('${username}', '${email}', '${hash}', '${role}')`
  );
}

async function updateRole(userId, newRole) {
  // ❌ No input validation, direct SQL concat
  await db.query(`UPDATE users SET role = '${newRole}' WHERE id = ${userId}`);
}

// ❌ Unused variable
const MAX_LOGIN_ATTEMPTS = 999;

// ❌ console.log with user data
async function logAccess(userId) {
  const user = await findById(userId);
  console.log("User accessed:", user);
}

module.exports = { findById, findByEmail, create, updateRole, logAccess };
