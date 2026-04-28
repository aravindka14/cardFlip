import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const baseURL = "http://localhost:3000/";

const interceptor = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const useGetAiTools = () => {
  return useQuery({
    queryKey: ["ai-tools"],
    queryFn: async () => {
      const res = await interceptor.get(`/aiTools`);
      return res.data;
    },
  });
};  
