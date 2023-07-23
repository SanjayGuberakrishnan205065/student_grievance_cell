import { useState, useEffect } from "react";
import axios from "axios";
import DangerButton from "../../../components/buttons/DangerButton";
import { useNavigate, useParams } from "react-router-dom";
import BarLoaderOnText from "../../../components/loaders/BarLoaderOnText";
import Comments from "../../../components/grievance/anonymous/Comments";
import { useForm } from "react-hook-form";
import Description from "../../../components/grievance/anonymous/Description";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const TrackAnonymousGrievance = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(true);
  const [grievance, setGrievance] = useState(null);
  const [addingComment, setAddingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchGrievance = async () => {
      if (!executeRecaptcha) {
        navigate("/anonymous/grievances/track");
        return;
      }
      const recaptchaToken = await executeRecaptcha(
        "anonymous_grievance_track"
      );
      axios
        .get(`/api/anonymousGrievance/${trackingId}`, {
          headers: {
            recaptchaToken,
          },
        })
        .then((res) => {
          setGrievance(res.data.grievance);
          axios
            .get("/api/comment/anonymous/" + res.data.grievance._id)
            .then((res) => {
              setComments(res.data.comments);
              setLoading(false);
            });
        })
        .catch(() => {
          setLoading(false);
        });
    };
    fetchGrievance();
  }, []);
  const addComment = (data) => {
    setAddingComment(true);
    axios
      .post("/api/comment/anonymous/" + grievance._id, {
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
      .patch("/api/anonymousGrievance/status/" + grievance._id, {
        grievanceStatus: status,
      })
      .then((res) => {
        setGrievance(res.data.grievance);
      });
  };
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-5xl px-3">
        {loading ? (
          <div className="mt-10 pt-10">
            <BarLoaderOnText text={"Fetching grievance details..."} />
          </div>
        ) : (
          <div className="mt-3">
            <Description grievance={grievance} />
            <Comments
              userType="anonymous"
              comments={comments}
              grievance={grievance}
              register={register}
              addComment={addComment}
              addingComment={addingComment}
              errors={errors}
              handleSubmit={handleSubmit}
            />
            <div className="mb-4">
              {grievance.grievanceStatus.title === "Resolved" ? (
                <DangerButton onClick={() => modifyStatus("Reopened")}>
                  Reopen grievance
                </DangerButton>
              ) : grievance.grievanceStatus.title !== "Closed" ? (
                <DangerButton onClick={() => modifyStatus("Closed")}>
                  Close grievance
                </DangerButton>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TrackAnonymousGrievance;
