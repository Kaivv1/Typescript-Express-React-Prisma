import { isAuth } from "@/api/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useAuth = (interval = 60 * 60 * 1000) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["userAuth"],
    queryFn: isAuth,
    retry: 0,
  });

  useEffect(() => {
    const invalidateInterval = setInterval(() => {
      queryClient.invalidateQueries(
        { queryKey: ["userAuth"] },
        { cancelRefetch: true },
      );
    }, interval);

    return () => clearInterval(invalidateInterval);
  }, [queryClient, interval]);

  return {
    access: data?.access,
    msg: data?.msg,
    text: data?.text,
    isLoading,
  };
};
