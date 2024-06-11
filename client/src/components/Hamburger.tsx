import { Menu, X, Files, Star, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleHamburger = () => setIsOpen((isOpen) => !isOpen);
  return (
    <div className="flex items-center md:hidden">
      <DropdownMenu open={isOpen} onOpenChange={toggleHamburger}>
        <DropdownMenuTrigger className="cursor-pointer">
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Pages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/dashboard/files">
            <DropdownMenuItem className="flex w-full gap-1">
              <Files className="h-5 w-5" /> Files
            </DropdownMenuItem>
          </Link>
          <Link to="/dashboard/starred">
            <DropdownMenuItem className="flex w-full gap-1">
              <Star className="h-5 w-5" /> Starred
            </DropdownMenuItem>
          </Link>
          <Link to="/dashboard/trash">
            <DropdownMenuItem className="flex w-full gap-1">
              <Trash className="h-5 w-5" /> Trash
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Hamburger;
