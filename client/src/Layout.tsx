import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useEffect, useRef, useState } from "react";

const Layout = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const headerElement = headerRef.current;

    const updateHeaderHeight = () => {
      if (headerElement) setHeaderHeight(headerElement.offsetHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (headerElement) resizeObserver.observe(headerElement);

    return () => {
      if (headerElement) resizeObserver.unobserve(headerElement);
    };
  }, []);
  return (
    <div className="grid min-h-screen grid-cols-[8rem_1fr] grid-rows-[auto_1fr] gap-2 p-2">
      <Header className="col-span-2 row-start-1" ref={headerRef} />
      <Sidebar className="col-row-full" />
      <main
        className="overflow-y-auto rounded-lg border bg-card p-2 text-card-foreground shadow-sm sm:p-4"
        style={{ height: `calc(100vh - ${headerHeight}px - (3 * 8px))` }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
