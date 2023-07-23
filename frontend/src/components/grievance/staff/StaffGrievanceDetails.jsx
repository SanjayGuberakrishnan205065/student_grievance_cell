import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Description from "../../../components/grievance/regular/Description";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";
import Comments from "../../../components/grievance/regular/Comments";
import SuccessButton from "../../../components/buttons/SuccessButton";

const StaffGrievanceDetails = ({ userType }) => {
  const [loading, setLoading] = useState(true);
  const [grievance, setGrievance] = useState({});
  const [sentiment, setSentiment] = useState({});
  const [comments, setComments] = useState([]);
  const [addingComment, setAddingComment] = useState(false);
  const { grievanceId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addComment = (data) => {
    setAddingComment(true);
    axios
      .post("/api/comment/" + grievanceId, {
        comment: data.comment,
      })
      .then((res) => {
        setComments([...comments, res.data.comment]);
        setAddingComment(false);
        reset();
      });
  };
  const modifyStatus = (status) => {
    axios
      .patch("/api/grievance/status/" + grievanceId, {
        grievanceStatus: status,
      })
      .then((res) => {
        setGrievance(res.data.grievance);
      });
  };
  useEffect(() => {
    axios
      .get("/api/grievance/" + grievanceId)
      .then((res) => {
        setGrievance(res.data.grievance);
        setSentiment(res.data.sentiment);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("/api/comment/" + grievanceId).then((res) => {
      setComments(res.data.comments);
    });
  }, []);
  return (
    <div className="container mx-auto pb-5 px-3">
      {loading ? (
        <div className="flex mt-10 pt-10 justify-center">
          <div>
            <ClipLoaderWithText
              text={"Fetching grievance details..."}
              textclassName="text-2xl"
            />
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <Description grievance={grievance} sentiment={sentiment} />
          <Comments
            comments={comments}
            grievance={grievance}
            register={register}
            addComment={addComment}
            addingComment={addingComment}
            errors={errors}
            handleSubmit={handleSubmit}
            userType={userType || "staff"}
          />
          <div>
            {(grievance.grievanceStatus.title === "Assigned" ||
              grievance.grievanceStatus.title === "Reopened") && (
              <SuccessButton onClick={() => modifyStatus("In Progress")}>
                Mark as in progress
              </SuccessButton>
            )}
            {(grievance.grievanceStatus.title === "Assigned" ||
              grievance.grievanceStatus.title == "In Progress" ||
              grievance.grievanceStatus.title === "Reopened") && (
              <SuccessButton onClick={() => modifyStatus("Resolved")}>
                Mark as resolved
              </SuccessButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default StaffGrievanceDetails;
