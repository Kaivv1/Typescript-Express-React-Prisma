import FilesSection from "@/features/dashboard/FilesSection";
import { useFiles } from "@/features/dashboard/useFiles";

const Files = () => {
  const { files, isLoading } = useFiles("files");
  return (
    <div>
      <FilesSection title="Files" files={files!} isLoading={isLoading} />
    </div>
  );
};

export default Files;
