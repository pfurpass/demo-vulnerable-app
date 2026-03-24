// app.js — Demo Vulnerable App (intentional issues for Code Analyzer demo)
const express = require('express');
const app = express();

// ❌ Hardcoded secret
const JWT_SECRET = "super_secret_password_123";
const API_KEY = "sk-prod-a8f3k2m9x1q7w4e6r0t5y2u";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ❌ CORS wildcard
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

const userRoutes  = require('./src/routes/users');
const adminRoutes = require('./src/routes/admin');

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// ❌ console.log in production
console.log("Server starting on port 3000");

app.listen(3000, () => {
  console.log("App running");
});

module.exports = app;
