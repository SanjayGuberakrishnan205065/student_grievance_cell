import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../../context/AuthContext";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";
import ReCaptchaBranding from "../../../components/ReCaptchaBranding";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const StudentRegister = () => {
  const authDispatch = useAuthDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (studentDetails) => {
    if (studentDetails.password !== studentDetails.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    if (!executeRecaptcha) {
      setErrorMsg("Recaptcha not yet available");
      setLoading(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("student_register");
    studentDetails.recaptchaToken = recaptchaToken;
    axios
      .post("/api/student/register", studentDetails)
      .then((res) => {
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
          Student Register
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
              placeholder="Register No."
              {...register("registerNo", {
                required: "Register No. is required",
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "Register No. must be 10 characters",
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
            <label className="block mb-2 text-xl font-medium">Email</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.email ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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
                minLength: {
                  value: 6,
                  message: "Confirm Password must be at least 6 characters",
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          {errorMsg && (
            <p
              role="alert"
              className="my-2 text-sm text-red-600 dark:text-red-500"
            >
              {errorMsg}
            </p>
          )}
          <div className="mb-6">
            {loading ? (
              <ClipLoaderWithText text={"Registering"} />
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

export default StudentRegister;
