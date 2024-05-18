import { isAuth } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

type AuthError = Error & {
  msg: string;
  access: boolean;
};

export const useAuth = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userAuth"],
    queryFn: isAuth,
    retry: 0,
  });
  const authError = error as AuthError;

  return {
    access: data?.access || authError?.access,
    msg: data?.msg || authError?.msg,
    isLoading,
  };
};
