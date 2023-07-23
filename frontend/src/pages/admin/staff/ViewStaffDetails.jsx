import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";

const ViewStaffDetails = () => {
  const { staffId } = useParams();
  const [staff, setStaff] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/admin/staffs/view/details/" + staffId).then((res) => {
      setStaff(res.data.staff);
      setLoading(false);
    });
  });
  return (
    <div className="container mx-auto pb-5 px-3 divide-y">
      {loading ? (
        <div className="mt-10 pt-10 flex justify-center">
          <ClipLoaderWithText
            size={40}
            text="Fetching staff details..."
            textclassName="text-3xl"
          />
        </div>
      ) : (
        <div className="divide-y">
          <div className="text-3xl my-3">Staff Details</div>
          <div className="pt-3">
            <div className="mb-4">
              <span className="font-bold">Name: </span>
              {staff.name}
            </div>
            <div className="mb-4">
              <span className="font-bold">Staff ID: </span>
              {staff.staffId}
            </div>
            <div className="mb-4">
              <span className="font-bold">Department: </span>
              {staff.department.name}
            </div>
            <div className="mb-4">
              <span className="font-bold">Designation: </span>
              {staff.designation}
            </div>
            <div className="mb-4">
              <span className="font-bold">Email: </span>
              {staff.email}
            </div>
            <div className="mb-4">
              <span className="font-bold">Phone: </span>
              {staff.phone}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewStaffDetails;
