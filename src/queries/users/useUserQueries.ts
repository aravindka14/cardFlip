import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/";

const interceptor = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const useGetUsers = ({ page = 1, perPage = 5 } = {}) => {
  return useQuery({
    queryKey: ["users", page, perPage],
    queryFn: async () => {
      const res = await interceptor.get("/users", {
        params: {
          _page: page,
          _limit: perPage,
        },
      });
      return res.data;
    },
  });
};