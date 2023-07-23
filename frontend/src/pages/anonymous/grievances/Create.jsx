import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiErrorWarningLine } from "react-icons/ri";
import { BiCopy } from "react-icons/bi";
import { MdOutlineDone } from "react-icons/md";
import DangerAlert from "../../../components/alerts/DangerAlert";
import SuccessAlert from "../../../components/alerts/SuccessAlert";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";
import ReCaptchaBranding from "../../../components/ReCaptchaBranding";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const CreateAnonymousGrievance = () => {
  const [creatingGrievance, setCreatingGrievance] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [grievanceTypes, setGrievanceTypes] = useState([]);
  const [deptStaffs, setDeptStaffs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [loadingStaffList, setLoadingStaffList] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setCreatingGrievance(true);
    if (!executeRecaptcha) {
      setErrorMsg("Recaptcha not yet available");
      setCreatingGrievance(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("create_anonymous_grievance");
    axios
      .post("/api/anonymousGrievance", { ...data, recaptchaToken })
      .then((res) => {
        setTrackingId(res.data.grievance.trackingId);
        setCreatingGrievance(false);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMsg(err.response.data.message);
        setCreatingGrievance(false);
      });
  };
  useEffect(() => {
    axios.get("/api/grievance/types").then((res) => {
      setGrievanceTypes(res.data.grievanceTypes);
    });
    axios.get("/api/department").then((res) => {
      setDepartments(res.data.departments);
    });
  }, []);
  const updateStaffs = (e) => {
    setLoadingStaffList(true);
    setSelectedDept(e.target.value);
    axios.get(`/api/staff/department/${e.target.value}`).then((res) => {
      setLoadingStaffList(false);
      setDeptStaffs(res.data.staffs);
    });
  };
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-5xl px-3">
        <h1 className="text-4xl font-extrabold my-5 text-center">
          Create Anonymous Grievance
        </h1>
        {!trackingId ? (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  Grievance Title
                </label>
                <input
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors.title ? " border-red-500 dark:border-red-500" : "")
                  }
                  placeholder="Grievance Title"
                  {...register("title", {
                    required: "Grievance title is required",
                  })}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.title?.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  Describe your grievance
                </label>
                <textarea
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors.description
                      ? " border-red-500 dark:border-red-500"
                      : "")
                  }
                  placeholder="Grievance Description"
                  {...register("description", {
                    required: "Grievance description is required",
                  })}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.description?.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  Grievance Type
                </label>
                <select
                  {...register("grievanceType", { required: true })}
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors.grievanceType
                      ? "border-red-500 dark:border-red-500"
                      : "")
                  }
                >
                  <option value="">Select Grievance Type</option>
                  {grievanceTypes.map((grievanceType) => (
                    <option key={grievanceType._id} value={grievanceType._id}>
                      {grievanceType.name}
                    </option>
                  ))}
                </select>
                {errors.grievanceType && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Grievance type is required
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  Department
                </label>
                <select
                  {...register("department", { required: true })}
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors.department
                      ? " border-red-500 dark:border-red-500"
                      : "")
                  }
                  onChange={updateStaffs}
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
                    Department is required
                  </p>
                )}
              </div>
              {loadingStaffList && (
                <ClipLoaderWithText text="Fetching staffs..." />
              )}
              {selectedDept && !loadingStaffList && (
                <div className="mb-6">
                  <label className="block mb-2 text-xl font-medium">
                    Staff to assign
                  </label>
                  <select
                    className={
                      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                      (errors.staffAssigned
                        ? " border-red-500 dark:border-red-500"
                        : "")
                    }
                    {...register("staffAssigned", { required: true })}
                  >
                    <option value="">Select Staff</option>
                    {deptStaffs.map((staff) => (
                      <option key={staff._id} value={staff._id}>
                        {staff.name} ({staff.designation})
                      </option>
                    ))}
                  </select>
                  {errors.staffAssigned && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      Staff is required
                    </p>
                  )}
                </div>
              )}
              <div>{errorMsg && <DangerAlert alertContent={errorMsg} />}</div>
              <div className="mb-6">
                {creatingGrievance ? (
                  <ClipLoaderWithText text="Creating grievance..." />
                ) : (
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Raise Grievance
                  </button>
                )}
              </div>
            </form>
            <ReCaptchaBranding />
          </div>
        ) : (
          <div>
            <SuccessAlert alertContent="Your grievance has been raised successfully." />
            <p className="text-3xl my-3">
              Tracking ID: <span className="font-bold">{trackingId}</span>{" "}
              <span
                className="text-lg cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(trackingId);
                  setCopied(true);
                }}
              >
                {copied ? (
                  <MdOutlineDone className="inline" />
                ) : (
                  <BiCopy className="inline" />
                )}
              </span>
            </p>
            <div>
              You can track the status of your grievance using the tracking ID.
              <p className="text-sm my-3 font-extrabold">
                <RiErrorWarningLine className="inline" /> Make a note of the
                tracking ID before closing this page. It will not be displayed
                again.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateAnonymousGrievance;
