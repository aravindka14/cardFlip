import { useQuery } from "@tanstack/react-query";
import { interceptor } from "../interceptor";

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