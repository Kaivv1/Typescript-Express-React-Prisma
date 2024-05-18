import { FC } from "react";
import { Loader as LucideLoader, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
type LoaderProps = LucideProps & {
  size: "sm" | "md" | "lg";
};

const Loader: FC<LoaderProps> = ({ size, className }) => {
  let baseClassName = "animate-spin";
  if (size === "sm") baseClassName += " w-5 h-5";
  if (size === "md") baseClassName += " w-8 h-8";
  if (size === "lg") baseClassName += " w-12 h-12";

  return <LucideLoader className={cn(baseClassName, className)} />;
};

export default Loader;
