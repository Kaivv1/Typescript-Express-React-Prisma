import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react";

type HeadingVariants = "h1" | "h2" | "h3" | "h4";

type HeadingProps = ComponentPropsWithoutRef<HeadingVariants> & {
  as?: HeadingVariants;
};

const Heading: FC<HeadingProps> = ({ as = "h1", className, ...props }) => {
  const HeadingElement = as;
  let defaultClassName;

  if (as === "h1")
    defaultClassName =
      "scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl";
  if (as === "h2")
    defaultClassName =
      "scroll-m-20 border-b pb-2 text-2xl lg:text-3xl font-semibold tracking-tight first:mt-0";
  if (as === "h3")
    defaultClassName = "scroll-m-20 text-2xl font-semibold tracking-tight";
  if (as === "h4")
    defaultClassName = "scroll-m-20 text-xl font-semibold tracking-tight";

  return (
    <HeadingElement className={cn(defaultClassName, className)} {...props} />
  );
};

export default Heading;
