import axios from "axios";
import { useEffect, useState } from "react";

const ApproveStaffs = () => {
  const [unapprovedStaffs, setUnapprovedStaffs] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/staffs/view/unapproved")
      .then((res) => {
        setUnapprovedStaffs(res.data.staffs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleApprove = (staffId) => {
    axios
      .put("/api/admin/staffs/approve/" + staffId)
      .then((res) => {
        setUnapprovedStaffs(
          unapprovedStaffs.filter((staff) => staff._id !== staffId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container mx-auto px-3">
      <h1 className="text-4xl my-3">Approve Staffs</h1>
      {unapprovedStaffs.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
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
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {unapprovedStaffs.map((staff) => (
              <tr
                key={staff._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{staff.staffId}</td>
                <td className="px-6 py-4">{staff.name}</td>
                <td className="px-6 py-4">{staff.designation}</td>
                <td className="px-6 py-4">{staff.department.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleApprove(staff._id)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-2xl text-center">No unapproved staffs now</h1>
      )}
    </div>
  );
};
export default ApproveStaffs;
