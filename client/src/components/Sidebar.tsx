import { ComponentPropsWithoutRef, FC } from "react";
import NavigationBar from "./NavigationBar";
import { cn } from "@/lib/utils";

type SidebarProps = ComponentPropsWithoutRef<"aside">;

const Sidebar: FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        "flex w-full flex-col items-start rounded-lg border bg-card p-2 text-card-foreground shadow-sm sm:p-4",
        className,
      )}
    >
      <NavigationBar />
    </aside>
  );
};

export default Sidebar;
