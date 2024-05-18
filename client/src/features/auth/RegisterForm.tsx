import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import AuthSeparator from "@/components/AuthSeparator";
import SocialButton from "@/components/SocialButton";
import AuthFooter from "@/components/AuthFooter";
import { useRegister } from "./useRegister";

type RegisterFormProps = {
  email: string;
  fullName: string;
  password: string;
};

const RegisterForm: FC = (): React.JSX.Element => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterFormProps>();
  const { register: create, isCreating } = useRegister();

  const onSubmit: SubmitHandler<RegisterFormProps> = (data) => {
    create(data, {
      onSettled: () => reset(),
    });
  };

  return (
    <Card className="w-full max-w-96 ">
      <CardHeader>
        <CardTitle>FileDrive</CardTitle>
        <CardDescription>
          Welcome to FileDrive. Create an account and start using your personal
          file storage. 🚀
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Name"
            labelFor="fullName"
            error={errors.fullName?.message}
            {...register("fullName", {
              required: "This field is required",
              disabled: isCreating,
            })}
          />
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
              disabled: isCreating,
            })}
          />
          <FormField
            label="Password"
            labelFor="password"
            error={errors.password?.message}
            passwordField={true}
            {...register("password", {
              required: "This field is required",
              disabled: isCreating,
            })}
          />
          <Button type="submit" className="w-full gap-1" disabled={isCreating}>
            {isCreating ? (
              <>
                <span>Creating</span>
                <Loader size="sm" />
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
        <AuthSeparator />
        <SocialButton social="google">Continue with Google</SocialButton>
        <SocialButton social="github">Continue with GitHub</SocialButton>
      </CardContent>
      <CardFooter>
        <AuthFooter variant="register" />
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
