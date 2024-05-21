import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-2 p-2">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
