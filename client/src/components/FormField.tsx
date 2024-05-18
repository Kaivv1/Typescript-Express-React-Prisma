import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
type FormFieldProps = {
  label: string;
  labelFor: string;
  error?: string;
  passwordField?: boolean;
} & ComponentPropsWithoutRef<"input">;

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(
    { label, passwordField = false, labelFor, error, className, ...props },
    ref,
  ) {
    const [show, setShow] = useState(false);
    return (
      <div className="space-y-2">
        <div className="flex h-fit items-center justify-between">
          <Label htmlFor={labelFor}>{label}</Label>
          {error && (
            <span className="text-sm leading-none text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {error}
            </span>
          )}
        </div>
        {passwordField ? (
          <div className="relative">
            <div
              className="absolute right-3 top-[0.6rem] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <EyeOff className="w-5" /> : <Eye className="w-5" />}
            </div>
            <Input
              type={show ? "text" : "password"}
              {...props}
              className={cn("pr-[2.4rem]", className)}
              ref={ref}
            />
          </div>
        ) : (
          <Input {...props} ref={ref} />
        )}
      </div>
    );
  },
);

export default FormField;
