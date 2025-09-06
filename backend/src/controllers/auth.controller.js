const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      education,
      skills,
      phone,
      github,
      linkedin,
      work,
    } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "name, email & password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({ email, password, name });

    // build profile
    const profileData = {
      user: user._id,
      name,
      email,
      education: education || "",
      skills: skills
        ? skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      phone: phone || "",
      github: github || "",
      linkedin: linkedin || "",
      projects: [],
      work: work ? JSON.parse(work) : [],
    };

    if (req.file) {
      profileData.resumeFile = `/uploads/${req.file.filename}`;
    }

    const profile = await Profile.create(profileData);

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
      profile,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await user.matchPassword(password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    const profile = await Profile.findOne({ user: user._id }).lean();

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || profile?.name || null, // always return name
      },
      profile: profile || null,
    });
  } catch (err) {
    next(err);
  }
};
