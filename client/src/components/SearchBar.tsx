import type { Dispatch, FC, SetStateAction } from "react";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

type SearchBarProps = {
  query: string;
  onSearch: Dispatch<SetStateAction<string>>;
};

type FormProps = {
  query: string;
};

const SearchBar: FC<SearchBarProps> = ({ query, onSearch }) => {
  const { reset, handleSubmit, register } = useForm<FormProps>({
    defaultValues: { query },
  });

  const onSubmit: SubmitHandler<FormProps> = ({ query }) => {
    onSearch(query);
    reset();
    console.log(query);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <Input
        {...register("query", {
          required: true,
        })}
        placeholder="Search for files..."
      />
      <Button type="submit" className="gap-1">
        Search
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default SearchBar;
