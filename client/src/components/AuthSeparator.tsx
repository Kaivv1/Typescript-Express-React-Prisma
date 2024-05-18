import Paragraph from "./Paragraph";

const AuthSeparator = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex-grow border-t"></div>
      <Paragraph variant="muted">OR</Paragraph>
      <div className="flex-grow border-t"></div>
    </div>
  );
};

export default AuthSeparator;
