import { user as userApi } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: userApi,
  });
  return { user: data?.user, isLoading };
};
