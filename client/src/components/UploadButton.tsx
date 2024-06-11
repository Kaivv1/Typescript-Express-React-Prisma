import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import FormField from "./FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpload } from "@/features/dashboard/useUpload";
import Loader from "./Loader";
import { useState } from "react";

type UploadFormProps = {
  title: string;
  file: FileList;
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadFormProps>();

  const { upload, isUploading } = useUpload();
  const onSubmit: SubmitHandler<UploadFormProps> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", data.file[0]);
    upload(formData, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((isOpen) => !isOpen)}>
      <DialogTrigger asChild>
        <Button>
          <span className="hidden md:block">Upload file</span>
          <Upload className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-72 sm:max-w-96">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>Choose a name and a file.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            label="Title"
            labelFor="title"
            error={errors.title?.message}
            type="text"
            {...register("title", {
              disabled: isUploading,
              required: "Enter a title",
            })}
          />
          <FormField
            type="file"
            label="File"
            labelFor="file"
            error={errors.file?.message}
            className="file:rounded-md file:bg-primary file:text-primary-foreground file:hover:cursor-pointer"
            {...register("file", {
              disabled: isUploading,
              required: "Add a file",
            })}
          />
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isUploading} className="gap-1">
              {isUploading ? (
                <>
                  <span>Uploading</span>
                  <Loader size="sm" />
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
