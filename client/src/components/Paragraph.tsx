import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, FC } from "react";

type ParagraphProps = ComponentPropsWithoutRef<"p"> & {
  variant: "sm" | "base" | "lg" | "muted";
};

const Paragraph: FC<ParagraphProps> = ({ className, variant, ...props }) => {
  let baseClassName;
  if (variant === "sm") baseClassName = "text-sm font-medium";
  if (variant === "base") baseClassName = "text-base";
  if (variant === "lg") baseClassName = "text-base 2xl:text-lg font-semibold";
  if (variant === "muted") baseClassName = "text-sm text-muted-foreground";

  return <p className={cn(baseClassName, className)} {...props} />;
};

export default Paragraph;
