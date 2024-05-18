import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const NoAuthModal = ({ msg }: { msg: string }) => {
  const navigate = useNavigate();
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {msg.charAt(0).toUpperCase() + msg.slice(1)}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {msg === "jwt expired"
              ? "Your session token has expired, please sign in again!"
              : "Please sign in again!"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => navigate("/login")}>
            Continue to login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoAuthModal;
