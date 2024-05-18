import { type Email, sendEmail as sendEmailApi } from "@/api/mail";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/helpers/error";
import { useMutation } from "@tanstack/react-query";

export const useSendEmail = ({ successMsg }: { successMsg: string }) => {
  const { toast } = useToast();

  const { mutate: sendEmail, isPending: isSending } = useMutation<
    unknown,
    CustomError,
    Email
  >({
    mutationFn: (args) => sendEmailApi(args),
    onSuccess: () => {
      toast({ title: successMsg, variant: "success" });
    },
    onError: (error) => {
      toast({ title: error.msg, variant: "destructive" });
    },
  });
  return { sendEmail, isSending };
};
