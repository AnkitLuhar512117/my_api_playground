require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

const MONGO_URI =
  process.env.MONGO_URI;

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // Clear previous data
    await User.deleteMany({});
    await Profile.deleteMany({});

    // User creation
    const email = "ankitluhar123@gmail.com";
    const user = await User.create({ email, password: "password123" });

    // Profile creation
    await Profile.create({
      user: user._id,
      name: "Ankit Luhar",
      email,
      avatar: "/uploads/avatar.png", // if you have an avatar
      bio: "Full-stack developer passionate about building impactful web apps and AI-powered tools.",
      education: [
        {
          degree: "B.Tech Computer Science",
          institution: "SKIT",
          year: "2022",
        },
      ],
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "HTML",
        "CSS",
        "TailwindCSS",
        "Python",
      ],
      projects: [
        {
          title: "RESUMESCAN",
          description:
            "Analyzes resumes and suggests keywords to improve ATS score for job applications.",
          links: ["https://github.com/ankitluhar512117/resumescan"],
          techStack: ["React", "Node.js", "Express", "MongoDB"],
        },
        {
          title: "docChat",
          description:
            "Chat with any uploaded PDF in real-time using AI-driven responses.",
          links: ["https://github.com/ankitluhar512117/me-api-playground"],
          techStack: ["React", "Node.js", "OpenAI API"],
        },
      ],
      work: [
        {
          role: "Full-stack Developer Intern",
          company: "Tech Company XYZ",
          duration: "June 2022 - Aug 2022",
          description:
            "Worked on building scalable web applications and integrating APIs.",
        },
        {
          role: "Freelance Web Developer",
          company: "Self-Employed",
          duration: "2021 - 2022",
          description:
            "Developed personal and client projects including portfolio websites and small web apps.",
        },
      ],
      social: {
        linkedin: "https://linkedin.com/in/ankitluhar",
        github: "https://github.com/ankitluhar512117",
        twitter: "https://twitter.com/ankitluhar",
      },
    });

    console.log("✅ Seed complete!");
    console.log("Login with:", email, "password: password123");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
