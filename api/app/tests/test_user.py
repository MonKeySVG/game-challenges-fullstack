from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_user():
    response = client.post("/register", json={"username": "testuser", "password": "password123"})
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"

def test_login_user():
    client.post("/register", json={"username": "testuser", "password": "password123"})
    response = client.post("/login", json={"username": "testuser", "password": "password123"})
    assert response.status_code == 200
    assert "access_token" in response.json()
