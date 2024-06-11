import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { Link } from "react-router-dom";

type LogoProps = ComponentPropsWithoutRef<"p">;

const Logo: FC<LogoProps> = ({ className, ...props }) => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/">
        <p
          className={cn("text-xl font-bold md:text-2xl", className)}
          {...props}
        >
          <span>File</span>
          <span className="text-primary">Drive</span>
        </p>
      </Link>
    </div>
  );
};

export default Logo;
