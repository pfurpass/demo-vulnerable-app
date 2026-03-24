# 🎯 Demo Vulnerable App

Testprojekt für den Code Analyzer — enthält **absichtliche** Sicherheitslücken und Code-Probleme.

## Enthaltene Probleme

### 🔴 Security (HIGH)
- SQL Injection (users.js, admin.js, user.js)
- Command Injection (admin.js, report_generator.py)
- Path Traversal (admin.js)
- Hardcoded Secrets: JWT, DB-Passwort, AWS-Keys, Stripe-Keys (config.js, data_sync.py)
- eval() / new Function() Nutzung (users.js, crypto.js)
- Unsafe pickle.loads() (data_sync.py, report_generator.py)
- SSL Verify disabled (data_sync.py, report_generator.py)
- MD5/SHA1 für Passwort-Hashing (users.js, crypto.js)
- Math.random() für Tokens (users.js, crypto.js)

### 🟡 Quality (MEDIUM/LOW)
- console.log() in Produktion (app.js, admin.js, models)
- Leere catch-Blöcke (users.js)
- debugger-Statement (admin.js)
- Synchrone FS-Operationen im async Context (admin.js)
- Bare except in Python (data_sync.py, report_generator.py)
- Mutable default arguments in Python (data_sync.py)
- print() statt logging in Python

### 🔵 Maintainability
- Hardcoded URLs (users.js, config.js)
- Async-Funktionen ohne try/catch
- Ungenutzte Variablen

**WICHTIG:** Dieses Projekt ist nur zum Testen — niemals in Produktion deployen!
