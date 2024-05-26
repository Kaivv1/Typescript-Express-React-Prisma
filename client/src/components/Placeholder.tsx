import Paragraph from "./Paragraph";
import UploadButton from "./UploadButton";
import empty from "../assets/empty-files.svg";
const Placeholder = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-5">
      <img src={empty} alt="" className="w-1/3 md:max-w-96" />
      <Paragraph variant="muted">You have no files, upload one now</Paragraph>
      <UploadButton />
    </div>
  );
};

export default Placeholder;
