import { uploadFile } from "@/api/files";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpload = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: (data: FormData) => uploadFile(data),
    onSuccess: ({ msg }) => {
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
  return { upload, isUploading };
};
