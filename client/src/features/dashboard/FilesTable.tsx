import { FileData } from "@/api/files";
import type { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRelative } from "date-fns";
import FileActions from "./FileActions";

type FilesTableProps = {
  files: FileData[];
};

const FilesTable: FC<FilesTableProps> = ({ files }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File name</TableHead>
          <TableHead>File type</TableHead>
          <TableHead>Last modified</TableHead>
          <TableHead>File size</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell>{file.title}</TableCell>
            <TableCell className="">{file.type}</TableCell>
            <TableCell>
              {formatRelative(file.updatedAt, new Date(Date.now()))}
            </TableCell>
            <TableCell>{file.size}</TableCell>
            <TableCell className="text-end">
              <FileActions file={file} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FilesTable;
