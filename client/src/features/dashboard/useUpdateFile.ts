import { updateFile } from "@/api/files";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: updateFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["searchedFiles"] });
    },
    onError: (error: CustomError) => {
      toast({
        title: `${error.statusCode}`,
        description: error.msg,
        variant: "destructive",
      });
    },
  });
  return { isUpdating, update };
};
