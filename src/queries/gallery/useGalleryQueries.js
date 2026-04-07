import { useQuery } from "@tanstack/react-query";
import { interceptor } from "../interceptor";

export const useGetGallery = (page =1) => {
  return useQuery({
    queryKey: ["gallery", page],
    queryFn: async () => {
      const res = await interceptor.get(
        `/photos?_limit=20&_page=${page}`
      );
      return res.data;
    },
  });
};