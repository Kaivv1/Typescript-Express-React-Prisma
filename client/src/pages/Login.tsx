import { ModeToggle } from "@/components/ModeToggle";
import LoginForm from "@/features/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ModeToggle />
      <LoginForm />
    </div>
  );
};

export default Login;
