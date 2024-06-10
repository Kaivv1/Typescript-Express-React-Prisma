import { update as updateApi } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: updateApi,
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: msg,
        variant: "success",
      });
    },
    onError: (error: CustomError) => {
      toast({
        title: `${error.statusCode}`,
        description: error.msg,
        variant: "destructive",
      });
    },
  });
  return { update, isUpdating };
};
