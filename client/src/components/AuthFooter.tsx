import type { FC } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Paragraph from "./Paragraph";

type AuthFooterProps = {
  variant: "login" | "register";
};

const AuthFooter: FC<AuthFooterProps> = ({ variant }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      {variant === "login" && (
        <Link to="/forgot-password">
          <Button variant="link" size="sm">
            Forgot Password ?
          </Button>
        </Link>
      )}
      {variant === "login" ? (
        <div className="flex flex-wrap items-center justify-center">
          <Paragraph variant="muted">Don't have an account ?</Paragraph>
          <Link to="/register">
            <Button variant="link" size="sm" className="px-2">
              Sign up
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center">
          <Paragraph variant="muted">Already have an account ?</Paragraph>
          <Link to="/login">
            <Button variant="link" size="sm" className="px-2">
              Sign in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthFooter;
