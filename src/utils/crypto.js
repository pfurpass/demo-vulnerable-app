// src/utils/crypto.js
const crypto = require('crypto');

// ❌ SHA1 for signatures (weak)
function signData(data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

// ❌ MD5 for file checksums
function checksumFile(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

// ❌ Math.random() for session IDs
function generateSessionId() {
  return Math.random().toString(36).substr(2, 9) +
         Math.random().toString(36).substr(2, 9);
}

// ❌ Hardcoded encryption key
const ENCRYPTION_KEY = "1234567890abcdef1234567890abcdef";
const IV = "abcdef1234567890";

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

// ❌ New Function (eval-like)
function runDynamic(code) {
  const fn = new Function('input', code);
  return fn;
}

module.exports = { signData, checksumFile, generateSessionId, encrypt, runDynamic };
