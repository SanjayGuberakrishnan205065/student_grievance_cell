import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PublicNavLinks from "./navlinks/PublicNavLinks";
import StaffNavLinks from "./navlinks/StaffNavLinks";
import StudentNavLinks from "./navlinks/StudentNavLinks";
import AdminNavLinks from "./navlinks/AdminNavLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();
  const closeNavbar = () => {
    setIsOpen(false);
  };
  return (
    <nav className="border-b dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MIT Guardian
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {!auth.isAuthenticated ? (
              <PublicNavLinks closeNavbar={closeNavbar} />
            ) : auth.userType === "student" ? (
              <StudentNavLinks closeNavbar={closeNavbar} />
            ) : auth.userType === "staff" ? (
              <StaffNavLinks closeNavbar={closeNavbar} />
            ) : auth.userType === "admin" ? (
              <AdminNavLinks closeNavbar={closeNavbar} />
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
