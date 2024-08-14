// api/axios.ts
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

// Create the Axios instance
const api = axios.create({
  baseURL: "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Utility function to fetch CSRF token from cookies
const fetchCsrfToken = (): string | null => {
  const cookies = document.cookie.split("; ");
  const xsrfTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("XSRF-TOKEN=")
  );
  return xsrfTokenCookie ? xsrfTokenCookie.split("=")[1] : null;
};

// Add request interceptor to include CSRF token in headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = fetchCsrfToken();
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      // Use AxiosHeaders methods to set headers
      (config.headers as AxiosHeaders).set("X-CSRF-TOKEN", token);
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default api;
