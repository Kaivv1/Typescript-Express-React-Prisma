import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className="grid min-h-screen grid-cols-[8rem_1fr] grid-rows-[auto_1fr] gap-2 p-2">
      <Header className="col-span-2 row-start-1" />
      <Sidebar className="col-row-full" />
      <main className="rounded-lg border bg-card p-2 text-card-foreground shadow-sm sm:p-4">
        <Outlet />
      </main>
      {/* <Footer className="col-span-2 row-start-3" /> */}
    </div>
  );
};

export default Layout;
