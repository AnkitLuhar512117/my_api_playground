
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (profile) {
      setData(profile);
      setLoading(false);
    }
  }, [profile]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">No profile data found.</p>
      </div>
    );
  }

  const displayName = data.name || "User";
  const displayEmail = data.email || "No email available";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
              {displayName[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{displayName}</h1>
              <p className="text-gray-600">{displayEmail}</p>
            </div>
          </div>
          {data.resumeFile && (
            <a
              href={`http://localhost:4000${data.resumeFile}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
            >
              View Resume
            </a>
          )}
        </div>

        {/* Education */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Education
          </h2>
          <p className="text-gray-600">{data.education || "N/A"}</p>
        </div>

        {/* Skills */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills?.length > 0 ? (
              data.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {s}
                </span>
              ))
            ) : (
              <p className="text-gray-600">No skills added</p>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Projects</h2>
          {data.projects?.length > 0 ? (
            <div className="grid gap-4">
              {data.projects.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-lg hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-gray-800">{p.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {p.description || "No description provided"}
                  </p>
                  {p.techstack?.length > 0 && (
                    <p className="text-gray-500 text-xs mt-1">
                      Tech Stack: {p.techstack.join(", ")}
                    </p>
                  )}
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {p.links?.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 text-sm hover:underline"
                      >
                        {link.includes("github")
                          ? "GitHub"
                          : link.includes("http")
                          ? "Live Demo"
                          : "Link"}
                      </a>
                    ))}
                    {p.deployLink && (
                      <a
                        href={p.deployLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 text-sm hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                    {p.repoLink && (
                      <a
                        href={p.repoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 text-sm hover:underline"
                      >
                        Repo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No projects added</p>
          )}
        </div>

        {/* Work Experience */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Work Experience
          </h2>
          {data.work?.length > 0 ? (
            <div className="grid gap-4">
              {data.work.map((w, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-lg hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-gray-800">
                    {w.role || "Role not specified"}
                  </h3>
                  <p className="text-gray-600">
                    {w.company || "Unknown Company"}
                  </p>
                  <p className="text-gray-500 text-sm">{w.duration || "N/A"}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    {w.description || "No description provided"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No work experience added</p>
          )}
        </div>

        {/* Links */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Links</h2>
          <div className="flex gap-4 flex-wrap">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline"
              >
                GitHub
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {data.phone && (
              <span className="text-gray-600">📞 {data.phone}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
