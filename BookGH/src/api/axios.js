import axios from "axios";

// Create the Axios instance
const api = axios.create({
  baseURL: "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const fetchCsrfToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="));
  return token ? token.split("=")[1] : null;
};

api.interceptors.request.use(
  (config) => {
    const token = fetchCsrfToken();
    if (token) {
      // console.log("Sending CSRF Token:", token); // Log the CSRF token
      config.headers["X-CSRF-TOKEN"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
