import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const ViewStaffs = () => {
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    axios
      .get("/api/department")
      .then((res) => {
        setDepartments(res.data.departments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container mx-auto px-3">
      <h1 className="text-4xl">Staffs</h1>
      <div>
        <div className="my-2">Select a department to view staffs from</div>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 max-w-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedDeptId}
          onChange={(e) => {
            setSelectedDeptId(e.target.value);
          }}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <Link to={selectedDeptId !== "" ? `department/${selectedDeptId}` : ""}>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            View Staffs
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
export default ViewStaffs;
