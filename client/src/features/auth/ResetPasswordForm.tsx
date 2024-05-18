import FormField from "@/components/FormField";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useResetPassword } from "@/features/auth/useResetPassword";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

type ResetPasswordFormProps = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm: FC = (): React.JSX.Element => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormProps>();
  const location = useLocation();
  const { resetPassword, isResetting } = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordFormProps> = (data) => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token")!;

    resetPassword(
      { token, ...data },
      {
        onSettled: () => reset(),
      },
    );
  };

  return (
    <Card className="w-full max-w-96 p-2 pb-0">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Enter and confirm your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="New password"
            labelFor="newPassword"
            error={errors.newPassword?.message}
            {...register("newPassword", {
              disabled: isResetting,
            })}
            passwordField={true}
          />
          <FormField
            label="Confirm password"
            labelFor="confirmPassword"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              disabled: isResetting,
            })}
            passwordField={true}
          />
          <Button className="w-full gap-1" disabled={isResetting}>
            {isResetting ? (
              <>
                <span>Resetting</span>
                <Loader size="sm" />
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
