import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const staffNavLinks = ({ closeNavbar }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleClick = (e) => {
    e.preventDefault();
    closeNavbar();
    switch (e.target.id) {
      case "viewAssignedGrievances":
        navigate("/staff/grievances/view/assigned");
        break;
      case "profile":
        navigate("/staff/profile");
        break;
      case "logout":
        navigate("/auth/logout");
        break;
    }
  };
  return (
    <>
      <li>
        <a
          onClick={handleClick}
          id="viewAssignedGrievances"
          className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          View Assigned Grievances
        </a>
      </li>
      <li>
        <a
          onClick={handleClick}
          id="profile"
          className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
        >
          {auth.user.name}
        </a>
      </li>
      <li>
        <a
          onClick={handleClick}
          id="logout"
          className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
        >
          Logout
        </a>
      </li>
    </>
  );
};
export default staffNavLinks;
