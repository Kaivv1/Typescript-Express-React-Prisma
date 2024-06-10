import { resetPassword as resetPasswordApi } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: ({ msg }) => {
      toast({ title: msg, variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["userAuth"] });
      navigate("/login");
    },
    onError: (error: CustomError) => {
      toast({
        title: `${error.statusCode}`,
        description: error.msg,
        variant: "destructive",
      });
    },
  });
  return { resetPassword, isResetting };
};
