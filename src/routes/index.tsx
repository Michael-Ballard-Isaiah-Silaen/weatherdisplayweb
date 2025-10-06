import { Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
