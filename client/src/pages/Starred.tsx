import FilesSection from "@/features/dashboard/FilesSection";
import { useFiles } from "@/features/dashboard/useFiles";

const Starred = () => {
  const { files, isLoading } = useFiles("starred");

  return (
    <div>
      <FilesSection title="Starred " files={files!} isLoading={isLoading} />
    </div>
  );
};

export default Starred;
