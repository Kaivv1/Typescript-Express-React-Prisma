import { deleteFile } from "@/api/files";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteFile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: deleteFile,
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["searchedFiles"] });
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

  return { remove, isDeleting };
};
