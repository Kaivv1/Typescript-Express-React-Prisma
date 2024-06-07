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
  const toggleConfirmDialog = () => setShowConfirm((isOpen) => !isOpen);

  const modifiedFiles =
    type === "all" ? files : files?.filter((file) => file.type === type);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-2">
        <Heading as="h2">{title}</Heading>
        <div className="flex items-center gap-2">
          <SearchBar />
          <UploadButton />
        </div>
      </div>
      <Tabs defaultValue="grid">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="file-type">Type Filter</Label>
            <Select
              value={type}
              onValueChange={(newType) => setType(newType as FileTypes)}
            >
              <SelectTrigger id="file-type" className="w-24">
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
          {page === "trash" && (
            <>
              <div>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  Trashed files will be deleted automatically forever after 15
                  days.
                </code>
                <Button
                  className="h-auto gap-1 px-1 py-1 text-sm"
                  onClick={toggleConfirmDialog}
                >
                  Clear all
                </Button>
              </div>

              <AlertDialog
                open={showConfirm}
                onOpenChange={toggleConfirmDialog}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to continue this action ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      All the trashed files will be deleted forever!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="gap-1"
                      onClick={() => {
                        const filesForDeletion = modifiedFiles.filter(
                          (file) => file.isForDeletion === true,
                        );
                        removeAll({ files: filesForDeletion });
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
          <TabsList className="">
            <TabsTrigger value="grid" className="gap-1">
              Grid
              <Grid />
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-1">
              <RowsIcon />
              Table
            </TabsTrigger>
          </TabsList>
        </div>
        {isLoading && (
          <div className="mt-28 flex w-full flex-col items-center justify-center gap-5">
            <Loader size="md" />
            <Paragraph variant="muted">Loading files...</Paragraph>
          </div>
        )}
        <TabsContent value="grid" className="grid grid-cols-5 gap-5">
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
