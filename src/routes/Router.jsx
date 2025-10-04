import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Layout from "../layout/Layout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../layout/Dashboard";
import DHome from "../dashboard/pages/DHome";
import ContentManege from "../dashboard/pages/ContentManege";
import AdminRoute from "../Context/AdminRoute/AdminRoute";
import RecentBlogs from "../Pages/RecentBlogs";
import BlogDetail from "../Pages/BlogDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/recent-blogs",
        element: <RecentBlogs />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: (
          <AdminRoute>
            <DHome />
          </AdminRoute>
        ),
      },
      // {
      //   path: "dhome",
      //   element: (
      //     <AdminRoute>
      //       <DHome />
      //     </AdminRoute>
      //   ),
      // },
      {
        path: "content",
        element: (
          <AdminRoute>
            <ContentManege />
          </AdminRoute>
        ),
      },
    ],
  },
]);
