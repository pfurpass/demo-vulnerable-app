# scripts/data_sync.py — intentional issues for demo
import pickle
import subprocess
import hashlib
import yaml
import os
import requests


# ❌ Hardcoded credentials
DB_PASSWORD = "supersecret_prod_password"
AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"


def sync_users(source_url):
    # ❌ SSL verification disabled
    response = requests.get(source_url, verify=False)
    return response.json()


def load_config(filename):
    # ❌ yaml.load() without Loader (unsafe)
    with open(filename) as f:
        return yaml.load(f.read())


def restore_session(session_data):
    # ❌ Unsafe pickle deserialization
    return pickle.loads(session_data)


def run_backup(db_name):
    # ❌ Command injection via shell=True with user input
    subprocess.call("pg_dump " + db_name + " > backup.sql", shell=True)


def hash_password(password):
    # ❌ MD5 for password hashing (weak)
    return hashlib.md5(password.encode()).hexdigest()


def process_template(template, user_input):
    # ❌ Using exec with user-controlled input
    exec("result = " + user_input)


class UserManager:
    # ❌ Mutable default argument
    def __init__(self, users=[]):
        self.users = users

    def load_all(self):
        # ❌ Bare except
        try:
            result = sync_users("http://internal-api/users")
            self.users = result
        except:
            pass  # silently ignore ALL exceptions including KeyboardInterrupt

    def export(self, path="/tmp/users_export.csv"):
        # ❌ Hardcoded /tmp path + no encoding specified
        with open(path, "w") as f:
            for user in self.users:
                f.write(str(user))

    def find(self):
        # ❌ Broad exception raise
        raise Exception("Not implemented yet")


# ❌ Wildcard import (at module level would be caught, shown here for demo)
# from os.path import *

# ❌ print() instead of logging
print("Data sync module loaded")
print("Connecting to:", DB_PASSWORD)  # accidentally logs secret!
