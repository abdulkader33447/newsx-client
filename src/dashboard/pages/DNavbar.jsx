import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiBellSimpleLight } from "react-icons/pi";
import useAuth from "../../Hooks/useAuth";

const DNavbar = () => {
  const {user}= useAuth()
  // const user = {
  //   name: "Tylor Greak",
  //   profileImage: "https://via.placeholder.com/40",
  // };

  return (
    <nav className="bg-white/50 backdrop-blur-md shadow-md p-4 md:px-20 flex justify-between items-center">
      {/* Left Section - Greeting */}
      <div className="text-sm hidden sm:block">
        <p className="text-gray-500">Good Morning !</p>
        <h1 className="text-lg md:text-xl font-semibold">Tylor Greak</h1>
      </div>

      {/* Right Section - User Info and Icons */}
      <div className="flex items-center space-x-3">
        {/* Bell Icon */}
        <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
          <PiBellSimpleLight className="size-6" />
        </button>

        {/* Profile Image + Dropdown */}
        <div className="flex items-center space-x-2 p-1 rounded-lg border border-gray-300">
          <img
            src="#"
            alt="Profile"
            className="w-8 h-8 rounded-lg"
          />
          {/* Hide arrow on very small screens */}
          <button className="">
            <IoIosArrowDown />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DNavbar;
