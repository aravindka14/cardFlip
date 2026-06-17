import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import apiPath from "../apiPath"
import { interceptor } from "../interceptor"

export const useProfileQueries = () =>{
    const queryClient = useQueryClient();

    const useGetProfile = () => {
        return useQuery({
            queryKey: ["profile"],
            queryFn: async () => {
                const res = await interceptor.get(apiPath.profile.getProfile);
                return res.data;             
            },
        });
    };

    const useCreateProfile = () => {
        return useMutation({
            mutationFn: async ({data}) => {
                const res = await interceptor.post(apiPath.profile.addProfile, data);
                return res.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["profile"],
                });
            },
        });
    };

    const useUpdateProfile = () => {
        return useMutation({
            mutationFn: async ({data}) => {
                const res = await interceptor.put(apiPath.profile.updateProfile, data);
                return res.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["profile"],
                });
            },
        });
    }

    return {
        useGetProfile,
        useCreateProfile,
        useUpdateProfile
    }
}
    