
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  links: [String],
  techstack: [String], 
  repoLink: String, 
  deployLink: String, 
});

const workSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
  description: String,
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
  },
});

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: String,
  degree: String, 
  cgpa: String, 
  startYear: String, 
  endYear: String, 
  skills: [String],
  projects: [projectSchema],
  work: [workSchema],
  resumeFile: String, 
  phone: String,
  github: String,
  linkedin: String,
  codingPlatform: String, 
});

module.exports = mongoose.model("Profile", profileSchema);
