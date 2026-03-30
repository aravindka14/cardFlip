import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/";

export const interceptor = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
