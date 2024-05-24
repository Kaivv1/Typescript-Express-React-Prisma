import { logout as logoutApi } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: ["user", "userAuth"] });
      navigate("/login", { replace: true });
    },
  });
  return { isLoggingOut, logout };
};
