import { deleteAll } from "@/api/files";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteFiles = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: removeAll, isPending: isDeleting } = useMutation({
    mutationFn: deleteAll,
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
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

  return { removeAll, isDeleting };
};
