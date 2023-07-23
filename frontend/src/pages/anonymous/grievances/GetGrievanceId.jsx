import { useState } from "react";
import DangerAlert from "../../../components/alerts/DangerAlert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCaptchaBranding from "../../../components/ReCaptchaBranding";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const GetGrievanceId = () => {
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!trackingId) return setError("Tracking ID is required");
    setError("");
    if (!executeRecaptcha) {
      setError("Recaptcha not yet available");
      return;
    }
    const recaptchaToken = await executeRecaptcha("anonymous_grievance_track");
    axios
      .get("/api/anonymousGrievance/" + trackingId, {
        headers: {
          recaptchaToken,
        },
      })
      .then(() => {
        navigate("/anonymous/grievances/track/" + trackingId);
      })
      .catch(() => {
        setError("Invalid Tracking ID");
      });
  };
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-3xl px-3">
        <div>
          <h1 className="text-4xl font-extrabold my-5 text-center">
            Track Anonymous Grievance
          </h1>
          <form>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tracking ID
              </label>
              <input
                placeholder="32F2G7"
                value={trackingId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            {error && <DangerAlert alertContent={error} />}
            <div className="mb-6">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onSubmit}
              >
                Track
              </button>
            </div>
          </form>
          <ReCaptchaBranding />
        </div>
      </div>
    </div>
  );
};
export default GetGrievanceId;
