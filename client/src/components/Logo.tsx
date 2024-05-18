import filedrive from "../assets/file-drive.svg";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={filedrive} alt="" className="w-24" />
      <span>FileDrive</span>
    </div>
  );
};

export default Logo;
