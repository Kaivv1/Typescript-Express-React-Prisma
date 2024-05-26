import { FileData } from "@/api/files";
import { FC, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ImageIcon,
  FileTextIcon,
  GanttChartIcon,
  TextIcon,
  StarIcon,
} from "lucide-react";
import Paragraph from "../../../components/Paragraph";
import { formatRelative } from "date-fns";
import FileActions from "./FileActions";

type FileCardProps = {
  file: FileData;
};

const FileCard: FC<FileCardProps> = ({ file }) => {
  const { updatedAt, createdAt, title, isFavorite, isForDeletion, type, url } =
    file;
  const icon: {
    [el: string]: ReactNode;
  } = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    txt: <TextIcon />,
    csv: <GanttChartIcon />,
  };

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-1">
          {icon[type]}
          {title}
        </CardTitle>
        <div className="absolute right-4 top-2">
          <FileActions file={file} />
        </div>
      </CardHeader>
      <CardContent className="flex h-48 items-center justify-center">
        {type === "image" && url && (
          <img src={url} alt={title} className="h-full w-full object-contain" />
        )}
        {type === "pdf" && <FileTextIcon className="h-20 w-20" />}
        {type === "txt" && <TextIcon className="h-20 w-20" />}
        {type === "csv" && <GanttChartIcon className="h-20 w-20" />}
      </CardContent>
      <CardFooter className="items-center justify-between">
        <Paragraph variant="muted">
          Last modified {formatRelative(updatedAt, new Date(Date.now()))} <br />
        </Paragraph>
        {isFavorite && (
          <StarIcon className="h-5 w-5 fill-yellow-300 stroke-yellow-300" />
        )}
      </CardFooter>
    </Card>
  );
};

export default FileCard;
