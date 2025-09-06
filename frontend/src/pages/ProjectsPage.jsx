import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects"); // ✅ fetch all projects
        setProjects(res);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading projects...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">No projects available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {projects.map((p, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-gray-800">{p.title}</h2>
            <p className="text-gray-600 mt-2">{p.description}</p>
            <div className="flex gap-3 mt-4">
              {p.links?.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {link.includes("github")
                    ? "GitHub"
                    : link.includes("http")
                    ? "Live Demo"
                    : "Link"}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
