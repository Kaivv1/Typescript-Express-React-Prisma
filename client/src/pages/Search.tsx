import FilesSection from "@/features/dashboard/FilesSection";
import { useSearchFiles } from "@/features/dashboard/useSearchFiles";

const Search = () => {
  const { searchedFiles, isSearching } = useSearchFiles();

  return (
    <div>
      <FilesSection
        title="Search results"
        isLoading={isSearching}
        files={searchedFiles!}
      />
    </div>
  );
};

export default Search;
