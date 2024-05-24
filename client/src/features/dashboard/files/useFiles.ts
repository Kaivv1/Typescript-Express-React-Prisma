import { getFiles } from "@/api/files";
import { useQuery } from "@tanstack/react-query";

export const useFiles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
  });
  return { files: data?.files, isLoading, error };
};
