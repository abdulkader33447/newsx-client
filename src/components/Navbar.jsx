import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "./Loading";
import useUserInfo from "../Hooks/useUserInfo";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const { adminInfo } = useUserInfo(user?.email);
  const [isOpen, setIsOpen] = useState(false);
  console.log(adminInfo.name, "from nav");

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign out successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="fixed top-0 left-0 mb-16 w-full z-50">
      <nav className="bg-white/50 backdrop-blur-md shadow-md">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="font-medium hover:text-[#6200EE]">
              Home
            </Link>
            <Link
              to="recent-blogs"
              className="font-medium hover:text-[#6200EE]"
            >
              Resent Blogs
            </Link>

            {adminInfo?.name === "admin" && (
              <Link
                to="/dashboard"
                className="font-medium hover:text-[#6200EE]"
              >
                Dashboard
              </Link>
            )}

            {!user && (
              <Link to="/register" className="font-medium hover:text-[#6200EE]">
                Register
              </Link>
            )}
          </div>

          {/* User/Login/Logout */}
          <div>
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">
                  {adminInfo?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer hidden md:block bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block bg-[#6200EE] text-white py-2 rounded-lg hover:bg-[#6300eedc] transition px-4"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-500/10 backdrop-blur-sm shadow-md px-4 pb-4 space-y-3">
            <Link
              to="/"
              className="block font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="recent-blogs"
              className="font-medium block"
              onClick={() => setIsOpen(false)}
            >
              Resent Blogs
            </Link>

            {user && adminInfo?.name === "admin" && (
              <Link
                to="/dashboard"
                className="block font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {!user && (
              <Link
                className="font-medium block"
                to="/register"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block bg-[#6200EE] text-white px-4 py-2 rounded-lg hover:bg-[#6200EE] transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
