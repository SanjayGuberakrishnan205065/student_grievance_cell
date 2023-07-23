import { Link, useRouteError } from "react-router-dom";
import ClientError from "./ClientError";
import ServerError from "./ServerError";
import NotFoundPage from "./NotFoundPage";

export default function ErrorPage() {
  const error = useRouteError();
  if (error.status === 404) return <NotFoundPage />;
  if (error.status >= 400 && error.status < 500)
    return <ClientError error={error} />;
  if (error.status >= 500) return <ServerError error={error} />;
  return (
    <div
      id="error-page"
      className="text-center flex justify-center items-center min-h-screen"
    >
      <div>
        <h1 className="text-5xl my-3 font-bold">Oops!</h1>
        <p className="text-xl">Sorry, an unexpected error has occurred :/</p>
        <p className="my-3">
          {error.status} {error.statusText}
        </p>
        <Link
          to="/"
          className="font-medium text-2xl text-blue-600 dark:text-blue-500 hover:underline"
        >
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
