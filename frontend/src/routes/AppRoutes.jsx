import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Home from "../components/Home";
import Header from "../components/Header";
import ComposeMail from "../components/ComposeMail";
import Inbox from "../components/Inbox";
import FullMail from "../components/FullMail";
import Sidebar from "../components/Sidebar";
import Sent from "../components/Sent";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

const AppRoutes = () => {
  
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/Signup", element: <Signup /> },
        {path: "/compose", element: <ComposeMail />},
        {path: '/inbox', element: <Inbox />},
        {path: '/mail/:id', element: <FullMail />},
        {path: '/sent', element: <Sent />}
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default AppRoutes;
