import { register as registerApi } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: register, isPending: isCreating } = useMutation({
    mutationFn: registerApi,
    onSuccess: ({ msg }) => {
      toast({ title: msg, variant: "success" });
      navigate("/login");
    },
    onError: (error: CustomError) => {
      toast({ title: error.msg, variant: "destructive" });
    },
  });

  return { register, isCreating };
};
