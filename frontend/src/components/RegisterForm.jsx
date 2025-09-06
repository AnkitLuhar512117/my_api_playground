// src/components/RegisterForm.jsx
import { useState } from "react";
import { api } from "../services/api";

export default function RegisterForm() {
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
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => data.append(key, val));
      if (resume) data.append("resume", resume);

      await api.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Registration successful! You can now login.");
      setForm({
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
      setResume(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <textarea
          name="skills"
          placeholder="Skills (comma separated: React, Node.js, MongoDB)"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          name="education"
          placeholder="Education (e.g. B.Tech CSE)"
          value={form.education}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={form.degree}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            name="cgpa"
            placeholder="CGPA"
            value={form.cgpa}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="startYear"
            placeholder="Start Year"
            value={form.startYear}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            name="endYear"
            placeholder="End Year"
            value={form.endYear}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
        </div>

        <input
          type="url"
          name="github"
          placeholder="GitHub Profile"
          value={form.github}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={form.linkedin}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="url"
          name="leetcode"
          placeholder="LeetCode / Coding Platform Profile"
          value={form.leetcode}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <label className="block">
          <span className="text-gray-700">Upload Resume (PDF only)</span>
          <input
            type="file"
            accept="application/pdf"
            className="mt-2"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
