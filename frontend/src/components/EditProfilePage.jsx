import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function EditProfilePage() {
  const { user, profile, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    degree: "",
    cgpa: "",
    startYear: "",
    endYear: "",
    skills: "",
    phone: "",
    github: "",
    linkedin: "",
    codingPlatform: "",
  });
  const [projects, setProjects] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile || user) {
      setForm({
        name: profile?.name || user?.name || "",
        email: profile?.email || user?.email || "",
        education: profile?.education || "",
        degree: profile?.degree || "",
        cgpa: profile?.cgpa || "",
        startYear: profile?.startYear || "",
        endYear: profile?.endYear || "",
        skills: (profile?.skills || []).join(", "),
        phone: profile?.phone || "",
        github: profile?.github || "",
        linkedin: profile?.linkedin || "",
        codingPlatform: profile?.codingPlatform || "",
      });

      setProjects(
        (profile?.projects || []).map((p) => ({
          title: p.title || "",
          techstack: (p.techstack || []).join(", "),
          description: p.description || "",
          deployLink: p.links?.[0] || "",
          repoLink: p.links?.[1] || "",
        }))
      );
    }
  }, [profile, user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleProjectChange = (index, key, value) => {
    const copy = [...projects];
    copy[index][key] = value;
    setProjects(copy);
  };

  const addProject = () =>
    setProjects((prev) => [
      ...prev,
      {
        title: "",
        techstack: "",
        description: "",
        deployLink: "",
        repoLink: "",
      },
    ]);

  const removeProject = (i) =>
    setProjects((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ""));
      fd.append(
        "projects",
        JSON.stringify(
          projects
            .filter((p) => p.title.trim() !== "")
            .map((p) => ({
              ...p,
              techstack: p.techstack
                ? p.techstack
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [],
              links: [p.deployLink, p.repoLink].filter(Boolean),
            }))
        )
      );

      if (resumeFile) fd.append("resume", resumeFile);

      await updateProfile(fd);
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      setMessage("❌ Update failed: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Please login to edit your profile.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Info */}
          <Section title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <Input
                name="email"
                value={form.email}
                disabled
                placeholder="Email"
              />
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <Input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Skills (comma separated)"
                className="md:col-span-2"
              />
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="Institute"
              />
              <Input
                name="degree"
                value={form.degree}
                onChange={handleChange}
                placeholder="Degree"
              />
              <Input
                name="cgpa"
                value={form.cgpa}
                onChange={handleChange}
                placeholder="CGPA"
              />
              <div className="flex gap-3">
                <Input
                  name="startYear"
                  value={form.startYear}
                  onChange={handleChange}
                  placeholder="Start Year"
                />
                <Input
                  name="endYear"
                  value={form.endYear}
                  onChange={handleChange}
                  placeholder="End Year"
                />
              </div>
            </div>
          </Section>

          {/* Links */}
          <Section title="Profiles & Links">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="GitHub URL"
              />
              <Input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />
              <Input
                name="codingPlatform"
                value={form.codingPlatform}
                onChange={handleChange}
                placeholder="LeetCode / Other"
                className="md:col-span-2"
              />
            </div>
          </Section>

          {/* Resume */}
          <Section title="Resume">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-600"
            />
          </Section>

          {/* Projects */}
          <Section title="Projects">
            <div className="space-y-6">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="p-5 bg-gray-50 border rounded-xl shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">
                      Project {i + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeProject(i)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    value={p.title}
                    onChange={(e) =>
                      handleProjectChange(i, "title", e.target.value)
                    }
                    placeholder="Project Title"
                  />
                  <Input
                    value={p.techstack}
                    onChange={(e) =>
                      handleProjectChange(i, "techstack", e.target.value)
                    }
                    placeholder="Tech stack (comma separated)"
                  />
                  <textarea
                    value={p.description}
                    onChange={(e) =>
                      handleProjectChange(i, "description", e.target.value)
                    }
                    placeholder="Description"
                    rows={3}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                  <Input
                    value={p.deployLink}
                    onChange={(e) =>
                      handleProjectChange(i, "deployLink", e.target.value)
                    }
                    placeholder="Deploy link"
                  />
                  <Input
                    value={p.repoLink}
                    onChange={(e) =>
                      handleProjectChange(i, "repoLink", e.target.value)
                    }
                    placeholder="Repo link"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addProject}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                ➕ Add Project
              </button>
            </div>
          </Section>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-gray-700 ${className}`}
  />
);
