import moment from "moment";
import PrimaryButton from "../../buttons/PrimaryButton";
import InfoAlert from "../../alerts/InfoAlert";
import DangerAlert from "../../alerts/DangerAlert";
import { useEffect, useRef } from "react";

const Comments = ({
  comments,
  grievance,
  register,
  addComment,
  addingComment,
  errors,
  handleSubmit,
  userType,
}) => {
  const commentRef = useRef();
  useEffect(() => {
    if (commentRef.current)
      commentRef.current.scrollTop = commentRef.current.scrollHeight;
  }, [comments]);
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <div className="mb-4">
        <span className="font-bold">Comments</span>
      </div>
      {comments.length === 0 && <div className="mb-4">No comments yet</div>}
      <div className="max-h-96 overflow-scroll mb-3" ref={commentRef}>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className={`my-2 p-2 ${
              comment.authorType === userType
                ? "flex justify-end text-right"
                : "flex justify-start"
            }`}
          >
            <div
              className={`border rounded-lg p-2 divide-y divide-slate-500 dark:divide-slate-50 
${
  comment.authorType === userType
    ? "bg-purple-300 dark:bg-purple-600"
    : "bg-gray-100 dark:bg-slate-700"
}`}
            >
              <div className="text-xs">
                {comment.authorType === "student"
                  ? grievance.student.name
                  : comment.authorType === "admin"
                  ? "Admin"
                  : grievance.staffAssigned.name}
                , {moment(comment.createdAt).format("h:mm a DD MMMM YYYY   ")}
              </div>
              <div>{comment.comment}</div>
            </div>
          </div>
        ))}
      </div>
      {grievance.grievanceStatus.title !== "Closed" && (
        <form onSubmit={handleSubmit(addComment)}>
          <div className="mb-6">
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add any information you think is relevant"
              {...register("comment", {
                required: "A comment is required",
              })}
            />
          </div>
          {userType === "anonymous" && (
            <InfoAlert alertContent="Your comments will be anonymous and visible to the admin and the staff assigned to your grievance" />
          )}
          <div className="mb-6">
            {errors.comment && (
              <DangerAlert alertContent={errors.comment.message} />
            )}
          </div>
          <div className="mb-6">
            <PrimaryButton type="submit" disabled={addingComment}>
              Add Comment
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};
export default Comments;
