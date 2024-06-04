import { FileData, searchFiles } from "@/api/files";
import { CustomError } from "@/helpers/error";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useSearchFiles = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const { data, error, isLoading } = useQuery<
    { files: FileData[] },
    CustomError
  >({
    queryKey: ["searchedFiles"],
    queryFn: () => searchFiles(query!),
    retry: 0,
  });

  console.log(isLoading);
  return {
    searchedFiles: error ? [] : data?.files,
    isSearching: isLoading,
    error,
  };
};
