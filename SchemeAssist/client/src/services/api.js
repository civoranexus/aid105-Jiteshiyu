import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchSchemes = async () => {
  const response = await axios.get(`${API_BASE_URL}/schemes`);
  return response.data;
};

export async function registerUser(name) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}
