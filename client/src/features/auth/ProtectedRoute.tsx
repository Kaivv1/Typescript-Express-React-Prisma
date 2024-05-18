import NoAuthModal from "@/components/NoAuthModal";
import { useAuth } from "@/features/auth/useAuth";
import { Loader } from "lucide-react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { access, isLoading, msg } = useAuth();
  console.log(access, msg);
  if (isLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  if (!access && !msg) return <Navigate to="/login" />;
  if (!access && msg)
    return (
      <>
        {children}
        <NoAuthModal msg={msg} />
      </>
    );
  if (access) return children;
};

export default ProtectedRoute;
