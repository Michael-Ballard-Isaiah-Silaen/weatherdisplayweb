import { NavLink, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Breadcrumb = ({ className }: { className?: string }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      className={twMerge("relative flex w-full", className)}
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {pathnames.length > 0 ? (
          <li className="inline-flex items-center">
            <NavLink
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </NavLink>
            <span className="ml-2 text-gray-400">&gt;</span>
          </li>
        ) : (
          <li className="inline-flex items-center text-sm font-medium text-gray-500">
            Home
          </li>
        )}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="inline-flex items-center">
              {isLast ? (
                <span className="text-sm font-medium text-gray-500">
                  {decodeURIComponent(value)}
                </span>
              ) : (
                <>
                  <NavLink
                    to={to}
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    {decodeURIComponent(value)}
                  </NavLink>
                  <span className="ml-2 text-gray-400">&gt;</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
