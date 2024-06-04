import Paragraph from "./Paragraph";
import UploadButton from "./UploadButton";
import emptyFiles from "../assets/empty-files.svg";
import { useLocation } from "react-router-dom";
import { FileTypes } from "@/features/dashboard/FilesSection";
import { FC } from "react";

type PlaceholderProps = {
  type: FileTypes;
};

const Placeholder: FC<PlaceholderProps> = ({ type }) => {
  const { pathname } = useLocation();
  if (pathname === "/dashboard/files")
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-5">
        <img src={emptyFiles} alt="" className="w-1/3 md:max-w-96" />
        <Paragraph variant="muted">{`You have no ${type === "all" ? "files" : `${type} files`}, add one now.`}</Paragraph>
        <UploadButton />
      </div>
    );
  if (pathname === "/dashboard/starred")
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-5">
        <Paragraph variant="muted">{`You have no ${type === "all" ? "starred files" : `starred ${type} files`}.`}</Paragraph>
      </div>
    );
  if (pathname === "/dashboard/trash")
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-5">
        <Paragraph variant="muted">{`You have no ${type === "all" ? "trashed files" : `trashed ${type} files`}.`}</Paragraph>
      </div>
    );
  if (pathname === "/dashboard/search")
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-5">
        <Paragraph variant="muted">{`You have no ${type === "all" ? "files with that title" : `${type} files with that title`}.`}</Paragraph>
      </div>
    );
};

export default Placeholder;
