import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuthDispatch } from "../../../context/AuthContext";
import DangerAlert from "../../../components/alerts/DangerAlert";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ReCaptchaBranding from "../../../components/ReCaptchaBranding";

const StudentLogin = () => {
  const authDispatch = useAuthDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ registerNo, password }) => {
    setLoading(true);
    setErrorMsg("");
    if (!executeRecaptcha) {
      setErrorMsg("Recaptcha not yet available");
      setLoading(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("student_login");
    axios
      .post("/api/student/login", { registerNo, password, recaptchaToken })
      .then((res) => {
        setErrorMsg("");
        setLoading(false);
        authDispatch({
          user: res.data.student,
          userType: "student",
          type: "LOGIN",
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.response.data.message);
      });
  };

  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-3xl px-3">
        <h1 className="text-4xl font-extrabold my-5 text-center">
          Student Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">
              Register No.
            </label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.registerNo ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="2020504032"
              {...register("registerNo", {
                required: "Register No. is required",
                minLength: {
                  value: 3,
                  message: "Register No. must be at least 3 characters",
                },
              })}
            />
            {errors.registerNo && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.registerNo?.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Password</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.password ? " border-red-500 dark:border-red-500" : "")
              }
              type="password"
              placeholder="•••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
          {errorMsg && <DangerAlert alertContent={errorMsg} />}
          <div className="mb-6">
            {loading ? (
              <ClipLoaderWithText text="Logging you in..." />
            ) : (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            )}
          </div>
        </form>
        <small>
          Don't have an account yet?{" "}
          <span className="text-blue-600 dark:text-blue-500 hover:underline">
            <Link to="/auth/register/student">Register</Link>
          </span>
        </small>
        <ReCaptchaBranding />
      </div>
    </div>
  );
};

export default StudentLogin;
