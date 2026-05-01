"""Backend API tests for OSSPM website."""
import os
import pytest
import requests
from datetime import datetime

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://academic-pro-8.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_api_root_live(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert isinstance(data["message"], str)
        assert len(data["message"]) > 0


# ---------- Contact POST ----------
class TestContactCreate:
    def test_create_contact_valid(self, client):
        payload = {
            "name": "TEST_Ashok Gaikwad",
            "email": "test_osspm@example.com",
            "subject": "Admission enquiry",
            "message": "I would like information on admissions for 2026-27.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        # ISO parseable
        datetime.fromisoformat(data["created_at"].replace("Z", "+00:00"))
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]

    def test_create_contact_minimal_no_subject(self, client):
        payload = {
            "name": "TEST_Minimal",
            "email": "test_minimal@example.com",
            "message": "Quick ping.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["subject"] == ""
        assert "id" in data

    def test_create_contact_invalid_email(self, client):
        payload = {
            "name": "TEST_Bad",
            "email": "not-an-email",
            "message": "Hello",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_name(self, client):
        payload = {"email": "a@b.com", "message": "Hi"}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_empty_message(self, client):
        payload = {"name": "TEST_Empty", "email": "a@b.com", "message": ""}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_empty_name(self, client):
        payload = {"name": "", "email": "a@b.com", "message": "Hi"}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422


# ---------- Contact GET (list) ----------
class TestContactList:
    def test_list_contains_new_submission_sorted_desc(self, client):
        # Seed new submission
        marker = f"TEST_marker_{datetime.utcnow().timestamp()}"
        payload = {
            "name": marker,
            "email": "test_listing@example.com",
            "subject": "Listing test",
            "message": "Please keep me at top.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200

        r2 = client.get(f"{API}/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        assert len(items) >= 1

        # verify our marker is present
        names = [i.get("name") for i in items]
        assert marker in names

        # verify sort desc by created_at
        times = [i.get("created_at") for i in items if i.get("created_at")]
        parsed = [datetime.fromisoformat(t.replace("Z", "+00:00")) for t in times]
        assert parsed == sorted(parsed, reverse=True)

        # ensure no mongo _id leaks
        for i in items:
            assert "_id" not in i
