// src/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const crypto = require('crypto');

// ❌ SQL Injection — user input directly concatenated into query
router.get('/search', async (req, res) => {
  const username = req.query.username;
  const query = "SELECT * FROM users WHERE username = '" + username + "'";

  try {
    const results = await db.query(query);
    res.json(results);
  } catch (e) {
    // ❌ Empty catch block — swallows errors silently
  }
});

// ❌ SQL Injection via template literal
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db.query(`SELECT * FROM users WHERE id = ${id}`);
  res.json(result);
});

// ❌ Hardcoded URL
router.post('/notify', async (req, res) => {
  const webhookUrl = "https://hooks.internal.mycompany.com/user-events/prod";

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(req.body),
    });
    res.json({ ok: true });
  } catch (err) {
    console.log("Webhook failed:", err);
  }
});

// ❌ MD5 for password hashing (weak crypto)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

  await db.query(
    "INSERT INTO users (username, password) VALUES ('" + username + "', '" + hashedPassword + "')"
  );

  res.json({ success: true });
});

// ❌ Math.random() for token generation (not cryptographically secure)
router.post('/reset-password', async (req, res) => {
  const token = Math.random().toString(36).substring(2);
  const email = req.body.email;

  await db.query(`UPDATE users SET reset_token = '${token}' WHERE email = '${email}'`);

  res.json({ token });
});

// ❌ eval() usage
router.post('/calculate', (req, res) => {
  const expression = req.body.expression;
  const result = eval(expression);
  res.json({ result });
});

// ❌ No error handling in async function
router.delete('/:id', async (req, res) => {
  const result = await db.query(`DELETE FROM users WHERE id = ${req.params.id}`);
  res.json({ deleted: result.rowCount });
});

module.exports = router;
