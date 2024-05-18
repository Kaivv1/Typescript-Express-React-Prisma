import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthSeparator from "@/components/AuthSeparator";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogin } from "./useLogin";
import SocialButton from "@/components/SocialButton";
import Loader from "@/components/Loader";
import AuthFooter from "@/components/AuthFooter";

type LoginFormProps = {
  email: string;
  password: string;
};

const LoginForm: FC = (): React.JSX.Element => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginFormProps>();
  const { login, isLogging } = useLogin();
  const onSubmit: SubmitHandler<LoginFormProps> = (data) => {
    login(data, {
      onSettled: () => reset(),
    });
  };

  return (
    <Card className="w-full max-w-96 ">
      <CardHeader>
        <CardTitle>FileDrive</CardTitle>
        <CardDescription>Welcome back to your file storage. 👋🏼</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              disabled: isLogging,
            })}
          />
          <FormField
            label="Password"
            labelFor="password"
            error={errors.password?.message}
            passwordField={true}
            {...register("password", {
              required: "This field is required",
              disabled: isLogging,
            })}
          />
          <Button type="submit" className="w-full gap-1" disabled={isLogging}>
            {isLogging ? (
              <>
                <span>Logging in</span>
                <Loader size="sm" />
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
        <AuthSeparator />
        <SocialButton social="google">Log in with Google</SocialButton>
        <SocialButton social="github">Log in with GitHub</SocialButton>
      </CardContent>
      <CardFooter>
        <AuthFooter variant="login" />
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
