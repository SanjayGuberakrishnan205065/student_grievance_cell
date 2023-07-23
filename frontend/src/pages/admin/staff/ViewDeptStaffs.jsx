import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewDeptStaffs = () => {
  const { departmentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const [selectedDept, setSelectedDept] = useState({});
  useEffect(() => {
    setLoading(true);
    axios.get("/api/department/" + departmentId).then((res) => {
      setSelectedDept(res.data.department);
      axios
        .get("/api/admin/staffs/view/department/" + departmentId)
        .then((res) => {
          setStaffs(res.data.staffs);
          setLoading(false);
        });
    });
  }, [departmentId]);
  return (
    <div>
      <h1 className="text-3xl mt-5 mb-2">
        {selectedDept.name} Department Staffs
      </h1>
      {loading && (
        <div className="text-xl">Loading staffs from this department...</div>
      )}
      {!loading && staffs.length === 0 && (
        <div className="text-xl">
          Could not find staffs from this department
        </div>
      )}
      {!loading && staffs.length > 0 && (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Staff ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Verified
                </th>
                <th>More info</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => (
                <tr
                  key={staff._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{staff.staffId}</td>
                  <td className="px-6 py-4">{staff.name}</td>
                  <td className="px-6 py-4">{staff.designation}</td>
                  <td className="px-6 py-4">
                    {staff.approvedByAdmin ? "Yes" : "No"}
                  </td>
                  <td>
                    <Link to={`/admin/staffs/details/${staff._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* {staffs.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Approved</th>
              <th>More info</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.staffId}</td>
                <td>{staff.name}</td>
                <td>{staff.designation}</td>
                <td>{staff.approvedByAdmin ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/admin/staffs/details/${staff._id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
};
export default ViewDeptStaffs;
