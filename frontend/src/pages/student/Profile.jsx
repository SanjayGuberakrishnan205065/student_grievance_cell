import { useState, useEffect } from "react";
import axios from "axios";
import ClipLoaderWithText from "../../components/loaders/ClipLoaderWithText";

const StudentProfile = () => {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/student/profile")
      .then((res) => {
        setStudent(res.data.student);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container mx-auto pb-5 px-3 divide-y">
      {loading ? (
        <div className="mt-10 pt-10 flex justify-center">
          <ClipLoaderWithText
            size={40}
            text="Fetching your profile info..."
            textclassName="text-3xl"
          />
        </div>
      ) : (
        <div className="divide-y">
          <div className="text-3xl my-3">Profile</div>
          <div className="pt-3">
            <div className="mb-4">
              <span className="font-bold">Name: </span>
              {student.name}
            </div>
            <div className="mb-4">
              <span className="font-bold">Register no.: </span>
              {student.registerNo}
            </div>
            <div className="mb-4">
              <span className="font-bold">Department: </span>
              {student.department.name}
            </div>
            <div className="mb-4">
              <span className="font-bold">Email: </span>
              {student.email}
            </div>
            <div className="mb-4">
              <span className="font-bold">Phone: </span>
              {student.phone}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StudentProfile;
