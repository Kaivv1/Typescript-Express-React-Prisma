import { login as loginAPI } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: loginAPI,
    onSuccess: () => navigate("/", { replace: true }),
    onError: (error: CustomError) => {
      toast({ title: error.msg, variant: "destructive" });
    },
  });

  return { login, isLogging };
};
