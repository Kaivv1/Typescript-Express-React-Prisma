import NoAuthModal from "@/components/NoAuthModal";
import { useAuth } from "@/features/auth/useAuth";
import { Loader } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { access, isLoading, msg, text } = useAuth();
  console.log(access, msg, text);

  const handleToggleModal = () => setShowModal((open) => !open);

  useEffect(() => {
    if (!access && msg) setShowModal(true);
  }, [access, msg]);

  if (isLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  if (!access && !isLoading && !msg && !text) return <Navigate to="/login" />;

  return (
    <>
      {children}
      {showModal && (
        <NoAuthModal
          msg={msg!}
          text={text}
          open={showModal}
          onOpen={handleToggleModal}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
