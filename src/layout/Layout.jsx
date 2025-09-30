import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
