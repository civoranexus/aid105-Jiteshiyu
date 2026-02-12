import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-500 mt-2">Page not found</p>

      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
}
