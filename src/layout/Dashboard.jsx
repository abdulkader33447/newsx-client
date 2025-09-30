import { NavLink, Outlet } from "react-router"; // react-router-dom ব্যবহার করা হয়েছে
import {
  FaHome,
  FaTasks,
  FaUsers,
  FaPlus,
  FaWallet,
  FaBars,
} from "react-icons/fa";
import { HiOutlineCursorArrowRipple } from "react-icons/hi2";
import { useState } from "react";
import DNavbar from "../dashboard/pages/DNavbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center w-full px-4 py-2 rounded-md transition-all duration-300
      ${
        isActive
          ? "bg-[#6200EE] text-white shadow-md justify-start"
          : "text-gray-600 hover:bg-[#6300eedc]/10 hover:text-[#6200EE] justify-start lg:justify-start"
      }`;

  const renderLink = (to, Icon, label) => (
    <NavLink
      key={to}
      to={to}
      className={linkClasses}
      onClick={() => setSidebarOpen(false)}
    >
      {({ isActive }) => (
        <span className="flex items-center gap-3">
          <Icon size={20} />

          {isActive && (
            <span className="font-medium whitespace-nowrap">{label}</span>
          )}
        </span>
      )}
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --------------------- Desktop Sidebar --------------------- */}
      <aside className="hidden lg:flex w-fit p-4 bg-white shadow-md flex-col space-y-2">
        {renderLink("/dashboard", FaHome, "Home")}
        {renderLink(
          "/dashboard/content",
          HiOutlineCursorArrowRipple,
          "Content Manager"
        )}
        {/* {renderLink("/dashboard/taskList", FaTasks, "Task List")}
        {renderLink("/dashboard/withdrawals", FaWallet, "Withdrawals")}
        {renderLink("/dashboard/manageUsers", FaUsers, "Manage Users")}
        {renderLink("/dashboard/addNewTask", FaPlus, "Add New Task")} */}
      </aside>

      {/* --------------------- Mobile/Tablet Drawer --------------------- */}
      {sidebarOpen && (
        // Overlay
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          />

          <aside
            className="relative w-64 bg-white shadow-2xl p-4 flex flex-col space-y-3 z-50 
                       transform transition-transform duration-300 ease-in-out"
            style={{
              transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            {/* Close Button */}
            <button
              className="self-end mb-4 text-2xl text-gray-700 hover:text-red-500"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>

            {/* Mobile Links */}
            {renderLink("/dashboard", FaHome, "Home")}
            {renderLink(
              "/dashboard/content",
              HiOutlineCursorArrowRipple,
              "Content Manager"
            )}
            {/* {renderLink("/dashboard/taskList", FaTasks, "Task List")}
            {renderLink("/dashboard/withdrawals", FaWallet, "Withdrawals")}
            {renderLink("/dashboard/manageUsers", FaUsers, "Manage Users")}
            {renderLink("/dashboard/addNewTask", FaPlus, "Add New Task")} */}
          </aside>
        </div>
      )}

      {/* --------------------- Main Content Area --------------------- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DNavbar />
        <div className="p-4 bg-white shadow-sm lg:hidden flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <button
            className="p-2 text-gray-600 hover:text-[#6200EE]"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </div>
        <main className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
