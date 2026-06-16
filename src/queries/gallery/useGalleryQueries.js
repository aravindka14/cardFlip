import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { interceptor } from "../interceptor";

const baseURL = "https://jsonplaceholder.typicode.com/";

export const interceptor = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const useGetGallery = (page, limit) => {
  return useQuery({
    queryKey: ["gallery", page],
    queryFn: async () => {
      const res = await interceptor.get(
        `/photos?_limit=${limit}&_page=${page}`
      );
      return res.data;
    },
  });
};