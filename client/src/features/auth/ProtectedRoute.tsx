import NoAuthModal from "@/components/NoAuthModal";
import { useAuth } from "@/features/auth/useAuth";
import { Loader } from "lucide-react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { access, isLoading, msg, text } = useAuth();
  console.log(access, msg, text);
  if (isLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  if (!access && !msg && !text) return <Navigate to="/login" />;
  if (!access && msg && text)
    return (
      <>
        {children}
        <NoAuthModal msg={msg} text={text} />
      </>
    );
  if (access) return children;
};

export default ProtectedRoute;
