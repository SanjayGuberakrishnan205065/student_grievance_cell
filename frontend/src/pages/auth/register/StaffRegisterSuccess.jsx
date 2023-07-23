const StaffRegisterSuccess = () => {
  return (
    <div className="container mx-auto my-3">
      <div className="text-4xl">Registration Successful!</div>
      <div className="my-3 px-3">
        <div
          className="flex p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
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
            <span className="font-medium">
              You have successfully registered as a staff member.
            </span>
          </div>
        </div>
        <div className="text-xl my-3">
          Please wait for the admin to approve your account, after which you
          will be able to login.
        </div>
      </div>
    </div>
  );
};
export default StaffRegisterSuccess;