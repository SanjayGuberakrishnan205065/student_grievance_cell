import moment from "moment";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

const Description = ({ grievance, sentiment }) => {
  return (
    <div>
      <div className="mb-2">
        <div className="text-4xl">{grievance.title}</div>
        <div className="text-xs">
          <div className="my-1">Anonymous grievance</div>
          <div>
            <span className="font-bold">Created: </span>
            {moment(grievance.createdAt).format("h:mm a, DD/MM/YYYY")}
          </div>
        </div>
      </div>
      <hr />
      <div className="mb-4 mt-3">
        <span className="font-bold">Tracking ID: </span>
        {grievance.trackingId}
      </div>
      {sentiment && (
        <div className="mb-4">
          <span className="font-bold">Sentiment: </span>
          {sentiment.positive > sentiment.negative
            ? "Positive " + sentiment.positive + "%"
            : "Negative " + sentiment.negative + "%"}
        </div>
      )}
      <div className="mb-4">
        <span className="font-bold">Description: </span>
        {grievance.description}
      </div>
      <div className="mb-4">
        <span className="font-bold">Staff Assigned: </span>
        {grievance.staffAssigned.name}
      </div>
      <div className="mb-4 flex items-center gap-2">
        <div>
          <span className="font-bold">Status: </span>
          {grievance.grievanceStatus.title}
        </div>
        <div
          data-tooltip-content={grievance.grievanceStatus.description}
          data-tooltip-id="status-tooltip"
          data-tooltip-place="bottom"
        >
          <BsInfoCircle />
          <Tooltip id="status-tooltip" />
        </div>
      </div>
      <div className="mb-4">
        <span className="font-bold">Category: </span>
        {grievance.grievanceType.name}
      </div>
    </div>
  );
};
export default Description;
