import { useUser } from "@/features/auth/useUser";
import { Avatar, AvatarImage } from "./ui/avatar";
import userIcon from "../assets/default-user.jpg";
import { LogOut, User as UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/useLogout";
import Loader from "./Loader";

const User = () => {
  const { user } = useUser();
  const { logout, isLoggingOut } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="flex items-center justify-center">
          {isLoggingOut ? (
            <Loader size="sm" />
          ) : (
            <AvatarImage src={user?.avatar ? user.avatar : userIcon} />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="items-center gap-1">
          <UserIcon className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="items-center gap-1"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
