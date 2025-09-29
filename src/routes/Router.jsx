import { createBrowserRouter } from "react-router";
// import Login from "../components/Login";
import Home from "../Pages/Home/Home";
import Layout from "../layout/Layout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
    children:[
      {
        path:"",
      }
    ]
  },
]);
