// src/routes/admin.js
const express = require('express');
const router  = express.Router();
const { exec, execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');
const db   = require('../utils/db');

// ❌ Hardcoded admin credentials
const ADMIN_USER = "admin";
const ADMIN_PASS = "Admin@123!";

function checkAuth(req, res, next) {
  const { user, pass } = req.headers;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// ❌ Command Injection — user input in shell command
router.post('/run-report', checkAuth, (req, res) => {
  const reportName = req.body.reportName;
  exec("generate-report " + reportName, (err, stdout) => {
    if (err) {
      console.log("Report error:", err);
    }
    res.json({ output: stdout });
  });
});

// ❌ Path Traversal — user controls file path
router.get('/files', checkAuth, (req, res) => {
  const filename = req.query.file;
  const content  = fs.readFileSync('/var/app/reports/' + filename, 'utf8');
  res.send(content);
});

// ❌ Synchronous FS in async context (blocks event loop)
router.get('/logs', checkAuth, (req, res) => {
  const logs = fs.readFileSync('/var/log/app.log', 'utf8');
  const lines = logs.split('\n').slice(-100);
  res.json({ lines });
});

// ❌ debugger statement left in code
router.post('/debug-user', checkAuth, (req, res) => {
  const userId = req.body.id;
  debugger;
  db.query(`SELECT * FROM users WHERE id = ${userId}`)
    .then(r => res.json(r));
});

// ❌ console.log with sensitive data
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);  // logs password!

  db.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`)
    .then(users => {
      if (users.length > 0) {
        res.json({ token: "hardcoded-jwt-token-abc123" });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
});

module.exports = router;
