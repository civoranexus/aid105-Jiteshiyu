import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong";

    if (error.response) {
      message =
        error.response.data?.message ||
        `Server Error (${error.response.status})`;
    } else if (error.request) {
      message = "No response from server. Check internet.";
    } else {
      message = error.message;
    }

    console.error("🔥 API ERROR:", message);

    return Promise.reject(message);
  }
);

export const fetchSchemes = async () => {
  const res = await api.get("/schemes");
  return res.data;
};

export const registerUser = async (name) => {
  const res = await api.post("/auth/register", { name });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export default api;
