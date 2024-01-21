import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeLayout from "../Layouts/HomeLayout";
import ProfileLayout from "../Layouts/ProfileLayout";
import ConnectionLayout from "../Layouts/ConnectionLayout";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/connections",
    element: <ConnectionLayout />,
  },
]);
