import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { api } from "@/constants";
import { cn } from "@/lib/utils";
import github from "../assets/github.png";
import google from "../assets/google.png";
type SocialButtonProps = {
  social: "google" | "github";
  children: ReactNode;
};

const SocialButton: FC<SocialButtonProps> = ({
  social,
  children,
}): React.JSX.Element => {
  let socialClassName;
  let icon;
  if (social === "google") {
    socialClassName = "bg-neutral-200 hover:bg-stone-200/90 text-black";
    icon = <img src={google} alt="google icon" className="h-6 w-6" />;
  }
  if (social === "github") {
    socialClassName = "bg-black hover:bg-black/85";
    icon = <img src={github} alt="github icon" className="h-6 w-6" />;
  }
  return (
    <Link to={`${api}/user/auth/${social}`} className="block">
      <Button type="button" className={cn("w-full gap-2", socialClassName)}>
        {icon}
        {children}
      </Button>
    </Link>
  );
};

export default SocialButton;
