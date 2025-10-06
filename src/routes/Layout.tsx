import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="flex min-h-screen w-screen flex-col bg-white">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
