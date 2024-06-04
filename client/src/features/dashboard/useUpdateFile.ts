import { updateFile } from "@/api/files";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFile = () => {
  const queryCLient = useQueryClient();
  const { toast } = useToast();

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: updateFile,
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["files"] });
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
