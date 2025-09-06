require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/me_api_db";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected for seeding");

  await User.deleteMany({});
  await Profile.deleteMany({});

  const email = "ankitluhar123@gmail.com";

  // ✅ plain password (schema will hash it)
  const user = await User.create({ email, password: "password123" });

  await Profile.create({
    user: user._id,
    name: "Ankit Luhar",
    email,
    education: "B.Tech Computer Science — SKIT",
    skills: ["javascript", "react", "nodejs", "mongodb", "express"],
    projects: [
      {
        title: "RESUMESCAN",
        description:
          "Give keywords suggestions to user to increase the ATS score",
        links: ["https://github.com/yourname/portfolio"],
      },
      {
        title: "docChat",
        description: "We can chat with any uploaded PDF in real time",
        links: ["https://github.com/yourname/me-api-playground"],
      },
    ],
    work: [],
  });

  console.log("✅ Seed complete.");
  console.log("Login with:", email, "password: password123");

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
