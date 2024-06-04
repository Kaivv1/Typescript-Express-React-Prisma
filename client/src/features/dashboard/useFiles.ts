import { getFiles } from "@/api/files";
import { useQuery } from "@tanstack/react-query";
import { compareAsc } from "date-fns";
import { PageType } from "./FilesSection";

export const useFiles = (page: PageType) => {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
    retry: 0,
  });

  const filesInOrder = data?.files.sort((a, b) =>
    compareAsc(a.createdAt, b.createdAt),
  );

  let pageFiles;
  if (page === "files")
    pageFiles = filesInOrder?.filter(
      ({ isFavorite, isForDeletion }) => !isFavorite && !isForDeletion,
    );
  if (page === "starred")
    pageFiles = filesInOrder?.filter(({ isFavorite }) => isFavorite);
  if (page === "trash")
    pageFiles = filesInOrder?.filter(({ isForDeletion }) => isForDeletion);

  return { files: pageFiles, isLoading };
};
