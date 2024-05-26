import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Files, Star, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavigationBar = () => {
  const { pathname } = useLocation();
  return (
    <NavigationMenu className="w-full items-start justify-start">
      <NavigationMenuList className="flex w-full flex-col  gap-5">
        <Link
          to="/dashboard/files"
          className={`flex w-full gap-1 transition-all duration-75 ease-linear ${
            pathname === "/dashboard/files"
              ? "border-l-2 border-l-primary pl-2 text-primary"
              : ""
          }`}
        >
          <Files className="h-5 w-5" />
          Files
        </Link>
        <Link
          to="/dashboard/starred"
          className={`flex w-full gap-1 transition-all duration-75 ease-linear ${
            pathname === "/dashboard/starred"
              ? "border-l-2 border-l-primary pl-2 text-primary "
              : ""
          }`}
        >
          <Star className="h-5 w-5" />
          Starred
        </Link>
        <Link
          to="/dashboard/trash"
          className={`flex w-full gap-1 transition-all duration-75 ease-linear ${
            pathname === "/dashboard/trash"
              ? "border-l-2 border-l-primary pl-2 text-primary"
              : ""
          }`}
        >
          <Trash className="h-5 w-5" />
          Trash
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationBar;
