import { user as userApi } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: userApi,
    retry: 0,
  });
  return { user: data?.user, isLoading };
};
