import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Paragraph from "./Paragraph";
import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";

type FooterProps = ComponentPropsWithoutRef<"footer">;

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    //
    <footer
      className={cn(
        " flex flex-col items-center justify-center gap-1 rounded-lg border bg-card p-2 text-card-foreground shadow-sm sm:p-4",
        className,
      )}
    >
      <div className="space-x-2">
        <Link to="">
          <Button className="p-0" variant="link">
            About
          </Button>
        </Link>
        <Link to="">
          <Button className="p-0" variant="link">
            Contacts
          </Button>
        </Link>
        <Link to="">
          <Button className="p-0" variant="link">
            Privacy
          </Button>
        </Link>
      </div>
      <Paragraph variant="muted">© FileDrive by Me</Paragraph>
    </footer>
  );
};

export default Footer;
