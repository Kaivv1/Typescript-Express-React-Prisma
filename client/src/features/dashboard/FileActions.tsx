import { FileData } from "@/api/files";
import { FC, useState } from "react";
import {
  MoreVertical,
  StarIcon,
  StarOffIcon,
  TrashIcon,
  UndoIcon,
  PencilIcon,
  EyeIcon,
  DownloadIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { downloadFile, open } from "@/helpers/download";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import FormField from "../../components/FormField";
import { Button } from "../../components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateFile } from "./useUpdateFile";
import Loader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FileActionsProps = {
  file: FileData;
};

type FileActionsFormProps = {
  title: string;
};

const FileActions: FC<FileActionsProps> = ({ file }) => {
  const { url, isFavorite, isForDeletion, title, id } = file;
  const [isOpenRename, setIsOpenRename] = useState<boolean>(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FileActionsFormProps>({ defaultValues: { title } });
  const { isUpdating, update } = useUpdateFile();
  const { toast } = useToast();

  const toggleRenameDialog = () => setIsOpenRename((isOpen) => !isOpen);
  const toggleConfirmDialog = () => setIsOpenConfirm((isOpen) => !isOpen);

  const onSubmit: SubmitHandler<FileActionsFormProps> = ({ title }) => {
    update(
      { title, id },
      {
        onSuccess: () => {
          toast({
            title: "Title updated",
            variant: "success",
          });
          toggleRenameDialog();
          reset();
        },
      },
    );
  };

  return (
    <>
      <AlertDialog open={isOpenConfirm} onOpenChange={toggleConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to continue this action ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The file won't be completely deleted, it will be moved to trash
              and deleted automatically after 15 days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="gap-1"
              disabled={isUpdating}
              onClick={() =>
                update(
                  { id, isForDeletion: !isForDeletion },
                  {
                    onSuccess: () => {
                      toast({
                        title: "Moved to trash",
                        variant: "success",
                      });
                    },
                  },
                )
              }
            >
              {isUpdating ? (
                <>
                  <span>Continuing</span>
                  <Loader size="sm" />
                </>
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isOpenRename} onOpenChange={toggleRenameDialog}>
        <DialogContent className="max-w-96">
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
            <DialogDescription>Add a new title</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="New title"
              labelFor="title"
              error={errors.title?.message}
              {...register("title", {
                minLength: {
                  value: 2,
                  message: "Title too short",
                },
                validate: {
                  sameValue: (value) => value !== title || "Choose a new title",
                },
                disabled: isUpdating,
              })}
            />
            <DialogFooter className="mt-4">
              <Button type="submit" className="gap-1" disabled={isUpdating}>
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

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => open(url)} className="gap-1">
            <EyeIcon className="h-5 w-5" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => downloadFile(url, title)}
            className="gap-1"
          >
            <DownloadIcon className="h-5 w-5" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleRenameDialog} className="gap-1">
            <PencilIcon className="h-5 w-5" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-1"
            onClick={() =>
              update(
                {
                  id,
                  isFavorite: !isFavorite,
                },
                {
                  onSuccess: () => {
                    toast({
                      title: isFavorite
                        ? "Removed from starred"
                        : "Moved to starred",
                      variant: "success",
                    });
                  },
                },
              )
            }
          >
            {isFavorite ? (
              <>
                <StarOffIcon className="h-5 w-5" />
                Remove from starred
              </>
            ) : (
              <>
                <StarIcon className="h-5 w-5" />
                Move to starred
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-1"
            onClick={() => {
              if (isForDeletion) {
                update(
                  { id, isForDeletion: !isForDeletion },
                  {
                    onSuccess: () => {
                      toast({
                        title: "File restored",
                        variant: "success",
                      });
                    },
                  },
                );
              } else {
                toggleConfirmDialog();
              }
            }}
          >
            {isForDeletion ? (
              <>
                <UndoIcon className="h-5 w-5" />
                Restore
              </>
            ) : (
              <>
                <TrashIcon className="h-5 w-5" />
                Move to trash
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FileActions;
