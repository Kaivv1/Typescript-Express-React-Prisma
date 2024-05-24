import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import User from "./User";
import { useAuth } from "@/features/auth/useAuth";
import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";

type HeaderProps = ComponentPropsWithoutRef<"header">;

const Header: FC<HeaderProps> = ({ className }) => {
  const { access, isLoading } = useAuth();

  return (
    <header
      className={cn(
        "flex justify-between gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm sm:p-4",
        className,
      )}
    >
      <Logo />
      {!isLoading && !access ? (
        <div className="flex items-center gap-1 md:gap-2">
          <Link to="/login">
            <Button size="sm">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign up</Button>
          </Link>
          <ModeToggle />
        </div>
      ) : (
        <div className="flex items-center gap-1 md:gap-2">
          <User />
          <ModeToggle />
        </div>
      )}
    </header>
  );
};

export default Header;
