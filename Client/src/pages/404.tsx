import { Link } from "react-router-dom";

function Page_Not_Found() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <Link
        to="/"
        className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Go back to Home
      </Link>
    </div>
  );
}

export default Page_Not_Found;
