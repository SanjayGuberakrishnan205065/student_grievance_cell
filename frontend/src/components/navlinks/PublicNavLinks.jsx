import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PublicNavLinks = ({ closeNavbar }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAnonmyousOpen, setIsAnonmyousOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (e.target.classList.contains("dropDownNavbarLinkLogin")) {
      setIsLoginOpen(!isLoginOpen);
      setIsAnonmyousOpen(false);
    } else if (e.target.classList.contains("dropdownNavbarLinkAnonymous")) {
      setIsLoginOpen(false);
      setIsAnonmyousOpen(!isAnonmyousOpen);
    } else {
      closeNavbar();
      setIsLoginOpen(false);
      setIsAnonmyousOpen(false);
      switch (e.target.id) {
        case "staffLoginLink":
          navigate("/auth/login/staff");
          break;
        case "studentLoginLink":
          navigate("/auth/login/student");
          break;
        case "newGrievanceLink":
          navigate("/anonymous/grievances/create");
          break;
        case "trackGrievanceLink":
          navigate("/anonymous/grievances/track");
          break;
      }
    }
  };
  return (
    <>
      <li>
        <button
          id="dropdownNavbarLinkLogin"
          data-dropdown-toggle="dropdownNavbar"
          className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dropDownNavbarLinkLogin"
          onClick={handleClick}
        >
          Login{" "}
          <svg
            className="w-5 h-5 ml-1 dropDownNavbarLinkLogin"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              className="dropDownNavbarLinkLogin"
            ></path>
          </svg>
        </button>
        {/* Dropdown menu */}
        {isLoginOpen && (
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
                  id="staffLoginLink"
                  onClick={handleClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Staff
                </span>
              </li>
              <li>
                <span
                  id="studentLoginLink"
                  onClick={handleClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Student
                </span>
              </li>
            </ul>
          </div>
        )}
      </li>
      <li>
        <button
          id="dropdownNavbarLinkAnonymous"
          data-dropdown-toggle="dropdownNavbar"
          className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dropdownNavbarLinkAnonymous"
          onClick={handleClick}
        >
          Anonymous Grievance{" "}
          <svg
            className="w-5 h-5 ml-1 dropdownNavbarLinkAnonymous"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              className="dropdownNavbarLinkAnonymous"
            ></path>
          </svg>
        </button>
        {/* Dropdown menu */}
        {isAnonmyousOpen && (
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
                  id="newGrievanceLink"
                  onClick={handleClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Raise a new grievance
                </span>
              </li>
              <li>
                <span
                  id="trackGrievanceLink"
                  onClick={handleClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Track grievance
                </span>
              </li>
            </ul>
          </div>
        )}
      </li>
      {/* <li>
        <a
          href="#"
          className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          How it works?
        </a>
      </li> */}
    </>
  );
};
export default PublicNavLinks;
