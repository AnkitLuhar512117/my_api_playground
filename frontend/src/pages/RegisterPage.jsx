// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    education: "",
    degree: "",
    cgpa: "",
    startYear: "",
    endYear: "",
    skills: "",
    github: "",
    linkedin: "",
    leetcode: "",
  });

  const [projects, setProjects] = useState([
    { title: "", techstack: "", description: "", deploy: "", github: "" },
  ]);

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle projects
  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", techstack: "", description: "", deploy: "", github: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (resume) {
        data.append("resume", resume);
      }

      // backend expects skills as comma separated
      data.set("skills", form.skills);

      // backend expects work as JSON string (we skip now)
      // backend expects projects inside profile -> we handle separately
      data.append("work", JSON.stringify([]));

      // add projects
      const formattedProjects = projects.map((p) => ({
        title: p.title,
        description: p.description,
        links: [p.deploy, p.github].filter(Boolean),
        techstack: p.techstack,
      }));
      data.append("projects", JSON.stringify(formattedProjects));

      await register(data);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="education"
              placeholder="Education"
              value={form.education}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={form.degree}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              name="cgpa"
              placeholder="CGPA"
              value={form.cgpa}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              name="startYear"
              placeholder="Start Year"
              value={form.startYear}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              name="endYear"
              placeholder="End Year"
              value={form.endYear}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="url"
              name="github"
              placeholder="GitHub"
              value={form.github}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn"
              value={form.linkedin}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="url"
              name="leetcode"
              placeholder="LeetCode / Coding Profile"
              value={form.leetcode}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          {/* Skills */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full"
          />

          {/* Projects */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Projects
            </h2>
            {projects.map((p, idx) => (
              <div key={idx} className="border rounded-lg p-4 mb-4 space-y-2">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={p.title}
                  onChange={(e) =>
                    handleProjectChange(idx, "title", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Tech Stack"
                  value={p.techstack}
                  onChange={(e) =>
                    handleProjectChange(idx, "techstack", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <textarea
                  placeholder="Description"
                  value={p.description}
                  onChange={(e) =>
                    handleProjectChange(idx, "description", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="url"
                  placeholder="Deploy Link"
                  value={p.deploy}
                  onChange={(e) =>
                    handleProjectChange(idx, "deploy", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="url"
                  placeholder="GitHub Repo"
                  value={p.github}
                  onChange={(e) =>
                    handleProjectChange(idx, "github", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addProject}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
            >
              + Add Project
            </button>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
