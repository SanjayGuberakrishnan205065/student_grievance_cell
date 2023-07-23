import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";
import ReCaptchaBranding from "../../../components/ReCaptchaBranding";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const StaffRegister = () => {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (staffDetails) => {
    if (staffDetails.password !== staffDetails.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    if (!executeRecaptcha) {
      setErrorMsg("Recaptcha not available yet");
      setLoading(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("staff_register");
    staffDetails.recaptchaToken = recaptchaToken;
    axios
      .post("/api/staff/register", staffDetails)
      .then(() => {
        setLoading(false);
        navigate("/auth/register/staff/success");
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.response.data.message);
      });
  };
  //   retrieve the list of departments on page load
  useEffect(() => {
    axios
      .get("/api/department")
      .then((res) => {
        setDepartments(res.data.departments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-3xl px-3">
        <h1 className="text-4xl font-extrabold my-5 text-center">
          Staff Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Staff ID</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.staffId ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Staff ID"
              {...register("staffId", {
                required: "Staff ID is required",
                minLength: {
                  value: 3,
                  message: "Staff ID must be at least 3 characters",
                },
              })}
            />
            {errors.staffId && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.staffId?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Name</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.name ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Department</label>
            <select
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.department ? " border-red-500 dark:border-red-500" : "")
              }
              {...register("department", {
                required: "Department is required",
              })}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.department?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">
              Designation
            </label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.designation
                  ? " border-red-500 dark:border-red-500"
                  : "")
              }
              placeholder="Designation"
              {...register("designation", {
                required: "Designation is required",
              })}
            />
            {errors.designation && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.designation?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Email</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.email ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <div
              className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span className="font-medium">
                You will receive emails about grievances assigned to you on this
                email address.
              </span>
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Phone</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.phone ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Phone"
              {...register("phone", {
                required: "Phone is required",
              })}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.phone?.message}
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
              placeholder="Password"
              type="password"
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
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">
              Confirm Password
            </label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.confirmPassword
                  ? " border-red-500 dark:border-red-500"
                  : "")
              }
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          {errorMsg && (
            <div
              className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{errorMsg}</span>
              </div>
            </div>
          )}
          <div className="mb-6">
            {loading ? (
              <ClipLoaderWithText text="Registering..." />
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
            )}
          </div>
        </form>
        <ReCaptchaBranding />
      </div>
    </div>
  );
};

export default StaffRegister;
