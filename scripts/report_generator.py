# scripts/report_generator.py
import os
import requests
import hashlib
import subprocess


# ❌ Hardcoded API URL + token
API_BASE = "https://api.analytics.mycompany.com/v2"
API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.abc123"


def fetch_report(report_id, filters={}):
    """Fetch a report from the analytics API."""
    # ❌ SSL disabled
    response = requests.get(
        f"{API_BASE}/reports/{report_id}",
        headers={"Authorization": API_TOKEN},
        params=filters,
        verify=False,
    )
    return response.json()


def render_pdf(template_name, data):
    # ❌ Command injection
    cmd = f"wkhtmltopdf {template_name} output.pdf"
    subprocess.run(cmd + " --data " + str(data), shell=True)


def cache_key(user_id, query):
    # ❌ SHA1 for cache keys (weak, collision-prone)
    return hashlib.sha1(f"{user_id}:{query}".encode()).hexdigest()


def load_plugin(plugin_path):
    # ❌ Unsafe pickle
    import pickle
    with open(plugin_path, "rb") as f:
        return pickle.load(f)


def cleanup_old_reports():
    # ❌ Bare except swallowing everything
    try:
        files = os.listdir("/tmp/reports")
        for f in files:
            os.remove(f"/tmp/reports/{f}")
    except:
        pass


# ❌ print instead of logging
print("Report generator ready")
print(f"API token: {API_TOKEN}")  # logs secret token!
