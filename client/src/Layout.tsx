import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header>This is header</header>
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};

export default Layout;
