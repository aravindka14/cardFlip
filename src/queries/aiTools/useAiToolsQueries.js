import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiPath from "../apiPath";

const baseURL = "http://localhost:3000/";

const interceptor = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const useAiToolsQueries = () => {
  const queryClient = useQueryClient();

  const useGetAiTools = () => {
    return useQuery({
      queryKey: ["ai-tools"],
      queryFn: async () => {
        const res = await interceptor.get(apiPath.aiTools.getAllAiTools);
        return res.data;
      },
    });
  };

  const useAddAiTools = () => {
    return useMutation({
      mutationFn: async ({data}) => {
        const res = await interceptor.post(apiPath.aiTools.addAiTools, data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["ai-tools"],
        });
      },
    });
  };

  const useDeleteAiTools = () => {
    return useMutation({
      mutationFn: async (id) => {
        const res = await interceptor.delete(apiPath.aiTools.deleteAiTools(id));
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["ai-tools"],
        });
      },
    })
  } 

  return {
    useGetAiTools,
    useAddAiTools,
    useDeleteAiTools
  };
};
