import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { NavHashLink } from "react-router-hash-link";
import mikelogo from "../components/universal/mikelogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleGoClick = () => {
    navigate(`/personal`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = {
    navBarScrolled: twMerge(
      `${isScrolled ? "h-16 backdrop-blur-md bg-white/70 shadow-md" : "h-24"}`,
    ),
    buttonScrolled: isScrolled ? "py-2" : "py-4",
  };

  return (
    <header
      className={`fixed left-0 top-0 z-[100] flex w-screen items-center justify-between px-6 font-[500] duration-100 ease-in lg:px-24 ${className.navBarScrolled}`}
    >
      <div className="flex flex-row gap-2">
        <img
          src={mikelogo}
          alt="Mike Logo"
          className="h-8 w-8 cursor-pointer"
          onClick={handleGoClick}
        />
        <NavLink
          to="/"
          className="cursor-pointer text-2xl font-bold tracking-wide text-blue-700"
        >
          MB
        </NavLink>
      </div>
      <div className="flex gap-4">
        <nav className="hidden cursor-pointer items-center justify-center gap-8 md:flex">
          <NavHashLink to="/#home" smooth className="hover:text-blue-600">
            Home
          </NavHashLink>
          <NavHashLink
            to="/#features"
            smooth
            className="cursor-pointer hover:text-blue-600"
          >
            More Information
          </NavHashLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
