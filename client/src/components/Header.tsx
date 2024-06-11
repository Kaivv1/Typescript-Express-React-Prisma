import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import User from "./User";
import { useAuth } from "@/features/auth/useAuth";
import { forwardRef, type ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
import Hamburger from "./Hamburger";

type HeaderProps = ComponentPropsWithRef<"header">;

const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { className },
  ref,
) {
  const { access } = useAuth();

  return (
    <header
      ref={ref}
      className={cn(
        "flex justify-between gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm sm:p-4",
        className,
      )}
    >
      <div className="flex gap-1 md:gap-2">
        <Logo />
        {access && <Hamburger />}
      </div>
      {!access ? (
        <div className="flex items-center gap-1 md:gap-2">
          <Link to="/login">
            <Button size="sm" className="px-2 md:px-4">
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="px-2 md:px-4">
              Sign up
            </Button>
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
});

export default Header;
