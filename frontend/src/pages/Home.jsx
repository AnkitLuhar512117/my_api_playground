// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to <span className="text-indigo-600">My-API Playground</span>
        </h1>

        {!user ? (
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Hello,{" "}
              <span className="font-semibold">{user.name || user.email}</span>{" "}
              👋
            </p>
            <div className="space-x-4">
              <Link
                to="/profile"
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                My Profile
              </Link>
              <Link
                to="/projects"
                className="px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
