import { useUser } from "@/features/auth/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
import Paragraph from "./Paragraph";

const User = () => {
  const { user } = useUser();
  const { logout, isLoggingOut } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-0 sm:gap-2">
          <Paragraph variant="base" className="hidden sm:block">
            {user?.fullName}
          </Paragraph>
          <Avatar className="flex h-9 w-9 items-center justify-center">
            {isLoggingOut ? (
              <Loader size="sm" />
            ) : (
              <>
                <AvatarImage src={user?.avatar ? user.avatar : userIcon} />
                <AvatarFallback>CN</AvatarFallback>
              </>
            )}
          </Avatar>
        </div>
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
