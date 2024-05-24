import { type FC, useState } from "react";
import SearchBar from "./SearchBar";
import UploadButton from "./UploadButton";
import Heading from "./Heading";
import { useFiles } from "@/features/dashboard/files/useFiles";

type FilesSectionProps = {
  title: string;
};

const FilesSection: FC<FilesSectionProps> = ({ title }) => {
  const [query, setQuery] = useState<string>("");
  const { files } = useFiles();
  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="">
          <Heading as="h2">{title}</Heading>
        </div>
        <div className="flex gap-2">
          <SearchBar query={query} onSearch={setQuery} />
          <UploadButton />
        </div>
      </div>
      <div>
        {files?.map((file) => (
          <div>
            <p>{file.title}</p>
            <p>{file.type}</p>
            <img src={file.url} className="h-20 w-20" alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FilesSection;
