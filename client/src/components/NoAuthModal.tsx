import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const NoAuthModal = ({
  msg,
  text,
  open,
  onOpen,
}: {
  msg: string;
  text?: string;
  open: boolean;
  onOpen: () => void;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="mx-auto max-w-72 sm:max-w-[28rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>{msg}</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              onOpen();
              queryClient.removeQueries();
              navigate("/login");
            }}
          >
            Continue to login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoAuthModal;
