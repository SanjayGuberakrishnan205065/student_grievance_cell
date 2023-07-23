import { useNavigate } from "react-router-dom";
import moment from "moment";

const StudentGrievanceCard = ({ grievance }) => {
  const navigate = useNavigate();
  const redirectToGrievance = () => {
    navigate("/student/grievances/view/" + grievance._id);
  };
  const maxDescriptionLength = 100;

  return (
    <div
      className="divide-y p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
      onClick={redirectToGrievance}
    >
      <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {grievance.title}
        </h5>
        <p className="mb-2 text-sm font-medium tracking-tight text-gray-500 dark:text-gray-400">
          {grievance.staffAssigned.name}
        </p>
        <div className="mb-2">
          <div className="text-sm">
            <span className="font-bold">Type:</span>{" "}
            {grievance.grievanceType.name} |{" "}
            <span className="font-bold">Status:</span>{" "}
            {grievance.grievanceStatus.title}
          </div>
          <div className="text-xs">
            Last updated:{" "}
            {moment(grievance.updatedAt).format("h:mm a, DD MMM YY")}
          </div>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-lg mb-3 font-normal text-gray-500 dark:text-gray-400">
          {grievance.description.length > maxDescriptionLength
            ? grievance.description.substring(0, maxDescriptionLength) + "..."
            : grievance.description}
        </p>
      </div>
    </div>
  );
};
export default StudentGrievanceCard;
