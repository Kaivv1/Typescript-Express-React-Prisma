import { Dispatch, FC, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import FormField from "./FormField";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "@/api/user";
import { useUpdateUser } from "@/features/auth/useUpdateUser";
import Loader from "./Loader";
import { useForgotPassword } from "@/features/auth/useForgotPassword";

type ProfileDialogProps = {
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
};

type ProfileFormProps = {
  avatar: string;
  email: string;
  fullName: string;
};

const ProfileDialog: FC<ProfileDialogProps> = ({ open, onOpen, user }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ProfileFormProps>();
  const { update, isUpdating } = useUpdateUser();
  const { isPending, forgotPassword } = useForgotPassword();
  const onSubmit: SubmitHandler<ProfileFormProps> = ({
    avatar,
    email,
    fullName,
  }) => {
    const formData = new FormData();

    if (avatar[0]) {
      formData.append("avatar", avatar[0]);
    }
    formData.append("email", email);
    formData.append("fullName", fullName);

    update(formData, {
      onSuccess: () => {
        onOpen(false);
      },
      onSettled: () => {
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="mx-auto max-w-72 sm:max-w-96">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Update your user profile</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            label="Avatar"
            labelFor="avatar"
            className="file:rounded-md file:bg-primary file:text-primary-foreground file:hover:cursor-pointer"
            type="file"
            {...register("avatar", {
              disabled: isUpdating || isPending,
            })}
          />
          <FormField
            label="Email"
            labelFor="email"
            type="email"
            error={errors.email?.message}
            defaultValue={user?.email}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Not a valid email",
              },
              disabled: isUpdating || isPending,
            })}
          />
          <FormField
            label="Full name"
            labelFor="fullName"
            type="text"
            error={errors.fullName?.message}
            defaultValue={user?.fullName}
            {...register("fullName", {
              required: "This field is required",
              disabled: isUpdating || isPending,
            })}
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              disabled={isUpdating || isPending}
              className="gap-1"
              onClick={() => {
                if (!user?.email) return;
                forgotPassword(
                  { email: user?.email },
                  { onSuccess: () => onOpen(false) },
                );
              }}
            >
              {isPending ? (
                <>
                  <span>Sending email</span>
                  <Loader size="sm" />
                </>
              ) : (
                "Change password"
              )}
            </Button>
            <Button
              type="submit"
              disabled={isUpdating || isPending}
              className="gap-1"
            >
              {isUpdating ? (
                <>
                  <span>Updating</span>
                  <Loader size="sm" />
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
