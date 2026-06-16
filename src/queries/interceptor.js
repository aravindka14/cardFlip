import axios from "axios";

// const baseURL = "https://jsonplaceholder.typicode.com/";
const baseURL = "http://localhost:3000";

export const interceptor = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interceptor.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, request, message } = error;

    if (response) {
      const { status, data } = response;
      switch (status) {
        case 400:
          console.error("Bad Request:", data?.message || "Invalid request");
          break;

        case 401:
          console.error(
            "Unauthorized:",
            data?.message || "Token expired or invalid",
          );
          localStorage.removeItem("token");
          sessionStorage.removeItem("accessToken");
          window.location.href = "/login";
          break;

        case 403:
          console.error("Forbidden:", data?.message || "Access denied");
          break;

        case 404:
          console.error("Not Found:", data?.message || "Resource not found");
          break;

        case 500:
          console.error(
            "Internal Server Error:",
            data?.message || "Something went wrong",
          );
          break;

        default:
          console.error("Unexpected Error:", error);
          break;
      }
    }
  },
);

export default interceptor
