import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa"; // react-icons
import logo from "../assets/logo.png";

// ধরো user data context বা props থেকে আসছে
const user = {
  name: "Abdul Kader",
  photoURL: "https://i.pravatar.cc/40", // demo image
  loggedIn: true, // false করলে Login দেখাবে
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 bottom-16 w-full">
      <nav className="bg-white/50 backdrop-blur-md shadow-md">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>

          {/* Center links (desktop only) */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="font-medium hover:text-[#6200EE]">
              Home
            </Link>
            <Link to="/dashboard" className="font-medium hover:text-[#6200EE]">
              Dashboard
            </Link>
          </div>

          {/* Right - User/Profile */}
          <div className="hidden md:block">
            {user?.loggedIn ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
            ) : (
              <Link
                to="/login"
                className="cursor-pointer bg-[#6200EE] text-white py-2 rounded-lg hover:bg-[#6300eedc] transition px-4"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-100 px-4 pb-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {user?.loggedIn ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
            ) : (
              <Link
                to="/login"
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
