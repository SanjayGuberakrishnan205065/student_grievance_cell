import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Description from "../../../components/grievance/regular/Description";
import Comments from "../../../components/grievance/regular/Comments";
import SuccessButton from "../../../components/buttons/SuccessButton";
import DangerButton from "../../../components/buttons/DangerButton";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";

const ViewGrievanceDetailsStaff = () => {
  const [loading, setLoading] = useState(true);
  const [grievance, setGrievance] = useState({});
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
    axios.get("/api/grievance/" + grievanceId).then((res) => {
      setGrievance(res.data.grievance);
      setLoading(false);
    });
    axios.get("/api/comment/" + grievanceId).then((res) => {
      setComments(res.data.comments);
    });
  }, []);
  if (loading)
    return (
      <div className="flex mt-10 pt-10 justify-center">
        <div>
          <ClipLoaderWithText
            text={"Fetching grievance details..."}
            textclassName="text-2xl"
          />
        </div>
      </div>
    );
  return (
    <div className="container mx-auto px-3 pb-3">
      <Description grievance={grievance} />
      <h2>Comments</h2>
      <Comments
        comments={comments}
        grievance={grievance}
        register={register}
        addComment={addComment}
        addingComment={addingComment}
        errors={errors}
        handleSubmit={handleSubmit}
        userType="student"
      />
      <div>
        {grievance.grievanceStatus.title === "Resolved" && (
          <DangerButton type="button" onClick={() => modifyStatus("Reopened")}>
            Reopen grievance
          </DangerButton>
        )}
        {grievance.grievanceStatus.title !== "Closed" && (
          <SuccessButton onClick={() => modifyStatus("Closed")}>
            Close grievance
          </SuccessButton>
        )}
      </div>
    </div>
  );
};
export default ViewGrievanceDetailsStaff;
