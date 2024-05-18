import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { FC } from "react";
import Loader from "@/components/Loader";
import { useForgotPassword } from "@/features/auth/useForgotPassword";

type ResetPasswordFormProps = {
  email: string;
};

const ForgotPasswordForm: FC = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { forgotPassword, isPending } = useForgotPassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormProps>();

  const onSubmit: SubmitHandler<ResetPasswordFormProps> = async (data) => {
    forgotPassword(data, {
      onSettled: () => reset(),
    });
  };

  return (
    <div className="w-fit space-y-1">
      <Button
        variant="link"
        size="sm"
        onClick={() => navigate(-1)}
        className="gap-1 px-0"
      >
        <MoveLeft className="h5 w-5" />
        Go back
      </Button>
      <Card className="w-full max-w-96 ">
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>
            Enter your email, and we will send you a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Email"
              labelFor="email"
              error={errors.email?.message}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Not a valid email",
                },
                disabled: isPending,
              })}
            />
            <Button type="submit" className="w-full gap-1" disabled={isPending}>
              {isPending ? (
                <>
                  <span>Sending</span>
                  <Loader size="sm" />
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
