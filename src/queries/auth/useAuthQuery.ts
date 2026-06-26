import { useMutation } from "@tanstack/react-query";
import interceptor from "../interceptor.js";

export const useAuthQuery = () => {
  const login = useMutation({
    mutationFn: async (data) => {
      const res = await interceptor.post(
        "/users/login",
        data
      );

      return res.data;
    },
  });

  return {
    login,
  };
};