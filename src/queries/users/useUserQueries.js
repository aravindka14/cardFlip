import { useQuery } from "@tanstack/react-query";
import { interceptor } from "../interceptor";

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