import { type FC, useState } from "react";
import SearchBar from "../../components/SearchBar";
import UploadButton from "../../components/UploadButton";
import Heading from "../../components/Heading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Grid, RowsIcon } from "lucide-react";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Loader from "../../components/Loader";
import Paragraph from "../../components/Paragraph";
import FileCard from "./FileCard";
import Placeholder from "@/components/Placeholder";
import FilesTable from "./FilesTable";
import { FileData } from "@/api/files";
import { Button } from "@/components/ui/button";
import { useDeleteFiles } from "./useDeleteFiles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

export type PageType = "files" | "starred" | "trash" | "search";

type FilesSectionProps = {
  title: string;
  files: FileData[];
  page?: PageType;
  isLoading?: boolean;
  error?: string;
};

export type FileTypes = "all" | "image" | "pdf" | "csv" | "txt";

const FilesSection: FC<FilesSectionProps> = ({
  title,
  files,
  isLoading,
  page,
}) => {
  const [type, setType] = useState<FileTypes>("all");
  const [showConfirm, setShowConfirm] = useState(false);
  const { removeAll, isDeleting } = useDeleteFiles();

  const modifiedFiles =
    type === "all" ? files : files?.filter((file) => file.type === type);

  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-2 md:mb-6">
        <Heading as="h2">{title}</Heading>
        <div className="flex items-center gap-2">
          <SearchBar />
          <UploadButton />
        </div>
      </div>
      <Tabs defaultValue="grid">
        <div className="mb-2 flex items-center justify-between gap-2 md:mb-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="file-type" className="flex gap-1">
              <span>Type</span> <span className="hidden sm:block">Filter</span>
            </Label>
            <Select
              value={type}
              onValueChange={(newType) => setType(newType as FileTypes)}
            >
              <SelectTrigger id="file-type" className="w-[5.1rem] md:w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="pdf">.pdf</SelectItem>
                <SelectItem value="txt">.txt</SelectItem>
                <SelectItem value="csv">.csv</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TabsList className="">
            <TabsTrigger value="grid" className="gap-1 px-2 md:px-4">
              Grid
              <Grid className="h-5 w-5 md:h-6 md:w-6" />
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-1 px-2 md:px-4">
              <RowsIcon className="h-5 w-5 md:h-6 md:w-6" />
              Table
            </TabsTrigger>
          </TabsList>
        </div>
        {page === "trash" && (
          <>
            <div className="mb-2 space-y-2 text-center md:mb-6 md:space-x-2 ">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                Trashed files will be deleted automatically forever after 15
                days.
              </code>
              <Button
                className="h-7 gap-1 px-1 py-1 text-sm md:h-7 md:px-1 md:py-1"
                onClick={() => setShowConfirm(true)}
              >
                Clear all
              </Button>
            </div>
            <AlertDialog open={showConfirm}>
              <AlertDialogContent className="mx-auto max-w-72 sm:max-w-[28rem]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to continue this action ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    All the trashed files will be deleted forever !
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setShowConfirm(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="gap-1"
                    disabled={isDeleting}
                    onClick={() => {
                      const filesForDeletion = modifiedFiles.filter(
                        (file) => file.isForDeletion === true,
                      );
                      removeAll(
                        { files: filesForDeletion },
                        {
                          onSuccess: () => {
                            setShowConfirm(false);
                          },
                        },
                      );
                    }}
                  >
                    {isDeleting ? (
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
          </>
        )}
        {isLoading && (
          <div className="mt-28 flex w-full flex-col items-center justify-center gap-5">
            <Loader size="md" />
            <Paragraph variant="muted">Loading files...</Paragraph>
          </div>
        )}
        <TabsContent
          value="grid"
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        >
          {modifiedFiles?.map((file) => <FileCard key={file.id} file={file} />)}
        </TabsContent>
        <TabsContent value="table">
          <FilesTable files={modifiedFiles!} />
        </TabsContent>
      </Tabs>
      {modifiedFiles?.length === 0 && <Placeholder type={type} />}
    </section>
  );
};

export default FilesSection;
