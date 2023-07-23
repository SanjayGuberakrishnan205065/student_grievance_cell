import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 dark:bg-gray-900 text-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center px-4">
        <p className="dark:text-white font-bold">&copy; MIT Guardian</p>
        <div className="flex flex-col md:flex-row">
          <Link
            to="/about"
            className=" dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:underline mb-2 md:mb-0 md:mr-4"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
