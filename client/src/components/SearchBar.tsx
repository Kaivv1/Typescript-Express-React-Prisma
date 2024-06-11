import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FileData } from "@/api/files";

type FormProps = {
  query: string;
};

const SearchBar = () => {
  const { reset, handleSubmit, register } = useForm<FormProps>();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const setQuery = async (query: string) =>
    new Promise((resolve) => {
      const { files }: { files: FileData[] | [] } = queryClient.getQueryData([
        "searchedFiles",
      ]) || { files: [] };

      if (files) {
        queryClient.removeQueries({ queryKey: ["searchedFiles"] });
      }

      searchParams.set("query", query);
      setSearchParams(searchParams);

      const newQuery = searchParams.get("query");
      return resolve(newQuery);
    });

  const onSubmit: SubmitHandler<FormProps> = async ({ query }) => {
    if (!query) return;

    await setQuery(query).then((newQuery) => {
      if (pathname !== "/dashboard/search") {
        navigate(`/dashboard/search?query=${newQuery}`);
      }
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <Input
        {...register("query", { required: true })}
        placeholder="Search for files..."
      />
      <Button type="submit">
        <span className="hidden md:block">Search</span>
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default SearchBar;
