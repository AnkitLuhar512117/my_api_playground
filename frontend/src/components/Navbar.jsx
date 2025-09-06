// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  // console.log(user);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600";

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700"
          >
            My-API Playground!
          </Link>

          {/* Links */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/login" className={isActive("/login")}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className={isActive("/profile")}>
                  Profile
                </Link>
                <Link to="/projects" className={isActive("/projects")}>
                  Projects
                </Link>
                <Link to="/edit-profile" className={isActive("/edit-profile")}>
                  Edit Profile
                </Link>

                {/* Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="avatar"
                        className="w-9 h-9 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                        {user.name ? user.name[0].toUpperCase() : "U"}
                      </div>
                    )}
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                      <div className="py-2">
                        <p className="px-4 py-2 text-gray-700 font-medium">
                          {user.name || "User"}
                        </p>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
