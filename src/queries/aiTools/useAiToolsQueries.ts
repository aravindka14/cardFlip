import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiPath from "../apiPath.js";
import interceptor from "../interceptor.js";

type AiToolsProps = {
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  detailedDescription: string;
  features: string[];
  footer: string[];
};

export const useAiToolsQueries = () => {
  const queryClient = useQueryClient();

  const useGetAiTools = () => {
    return useQuery<AiToolsProps[]>({
      queryKey: ["ai-tools"],
      queryFn: async () => {
        const res = await interceptor.get(apiPath.aiTools.getAllAiTools);
        return res.data;
      },
    });
  };

  const useAddAiTools = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: AiToolsProps }) => {
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
      mutationFn: async (id: number) => {
        const res = await interceptor.delete(apiPath.aiTools.deleteAiTools(id));
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["ai-tools"],
        });
      },
    });
  };

  return {
    useGetAiTools,
    useAddAiTools,
    useDeleteAiTools,
  };
};
