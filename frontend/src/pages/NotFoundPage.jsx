import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      id="error-page"
      className="text-center flex justify-center items-center min-h-screen"
    >
      <div>
        <h1 className="text-5xl my-3 font-bold">Oops!</h1>
        <p className="text-xl">
          Sorry, the page you are looking for does not exist
        </p>
        <p className="my-3">It may have been moved or deleted.</p>
        <Link
          to="/"
          className="font-medium text-2xl text-blue-600 dark:text-blue-500 hover:underline"
        >
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
