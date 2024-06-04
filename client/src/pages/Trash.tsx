import FilesSection from "@/features/dashboard/FilesSection";
import { useFiles } from "@/features/dashboard/useFiles";

const Trash = () => {
  const { files, isLoading } = useFiles("trash");

  return (
    <div>
      <FilesSection title="Trash" files={files!} isLoading={isLoading} />
    </div>
  );
};

export default Trash;
