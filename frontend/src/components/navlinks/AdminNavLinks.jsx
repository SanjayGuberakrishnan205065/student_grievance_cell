import { useState } from "react";
import { useNavigate } from "react-router-dom";

const adminNavLinks = ({ closeNavbar }) => {
  const [isStaffsOpen, setIsStaffsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("dropdownNavbarLinkStaff")) {
      setIsStaffsOpen(!isStaffsOpen);
    } else {
      closeNavbar();
      setIsStaffsOpen(false);
      switch (e.target.id) {
        case "viewAllStaffsLink":
          navigate("/admin/staffs/view");
          break;
        case "approveStaffsLink":
          navigate("/admin/staffs/approve");
          break;
        case "viewAllGrievancesLink":
          navigate("/admin/grievances/view/all");
          break;
        case "logoutLink":
          navigate("/auth/logout");
          break;
      }
    }
  };
  return (
    <>
      <li>
        <button
          id="dropdownNavbarLinkStaff"
          data-dropdown-toggle="dropdownNavbar"
          className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dropdownNavbarLinkStaff"
          onClick={handleClick}
        >
          Staffs{" "}
          <svg
            className="w-5 h-5 ml-1 dropdownNavbarLinkStaff"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              className="dropdownNavbarLinkStaff"
            ></path>
          </svg>
        </button>
        {/* Dropdown menu */}
        {isStaffsOpen && (
          <div
            id="dropdownNavbar"
            className="cursor-pointer z-10 block md:absolute mt-1 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-400"
              aria-labelledby="dropdownLargeButton"
            >
              <li>
                <span
                  id="viewAllStaffsLink"
                  onClick={handleClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  View all staffs
                </span>
              </li>
              <li>
                <span
                  id="approveStaffsLink"
                  onClick={handleClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Approve staffs
                </span>
              </li>
            </ul>
          </div>
        )}
      </li>
      <li>
        <a
          id="viewAllGrievancesLink"
          onClick={handleClick}
          className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          View Grievances
        </a>
      </li>
      <li>
        <a
          id="logoutLink"
          onClick={handleClick}
          className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Logout
        </a>
      </li>
    </>
  );
};
export default adminNavLinks;
