import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

const Container: FC<ContainerProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("w-full rounded-md border p-2 text-sm", className)}
      {...props}
    />
  );
};

export default Container;
