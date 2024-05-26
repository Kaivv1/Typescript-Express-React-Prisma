import { forgotPassword as forgotPasswordApi } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  const { toast } = useToast();
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: ({ msg }) => {
      toast({ title: msg, variant: "success" });
    },
    onError: (error: CustomError) => {
      toast({
        title: `${error.statusCode}`,
        description: error.msg,
        variant: "destructive",
      });
    },
  });
  return { forgotPassword, isPending };
};
