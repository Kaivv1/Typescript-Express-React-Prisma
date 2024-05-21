import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/">
        <p className="text-xl font-bold md:text-2xl">
          <span>File</span>
          <span className="text-primary">Drive</span>
        </p>
      </Link>
    </div>
  );
};

export default Logo;
