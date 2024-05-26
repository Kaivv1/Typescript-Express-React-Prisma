import { type FC, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import UploadButton from "../../../components/UploadButton";
import Heading from "../../../components/Heading";
import { useFiles } from "@/features/dashboard/files/useFiles";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Grid, RowsIcon } from "lucide-react";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import Loader from "../../../components/Loader";
import Paragraph from "../../../components/Paragraph";
import Placeholder from "../../../components/Placeholder";
import FileCard from "./FileCard";

export type PageType = "files" | "starred" | "trash";

type FilesSectionProps = {
  title: string;
  page: PageType;
};

type FileTypes = "all" | "image" | "pdf" | "csv" | "txt";

const FilesSection: FC<FilesSectionProps> = ({ title, page }) => {
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<FileTypes>("all");

  const { files, isLoading } = useFiles(page);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-2">
        <Heading as="h2">{title}</Heading>
        <div className="flex items-center gap-2">
          <SearchBar query={query} onSearch={setQuery} />
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
          {files?.map((file) => <FileCard key={file.id} file={file} />)}
        </TabsContent>
        <TabsContent value="table"></TabsContent>
      </Tabs>
      {files?.length === 0 && <Placeholder />}
    </section>
  );
};

export default FilesSection;
