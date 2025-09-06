const Profile = require("../models/Profile");
const User = require("../models/User");

// GET /api/profile/me
exports.getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // fetch basic user info
    const user = await User.findById(userId).select("name email").lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    // fetch profile if exists
    const profile = await Profile.findOne({ user: userId }).lean();

    // merge user + profile
    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
      ...(profile || {}), // only spread if profile exists
    };

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// PUT /api/profile/me  (multipart/form-data or JSON)
exports.updateMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const payload = req.body;

    // parse skills
    if (payload.skills && typeof payload.skills === "string") {
      payload.skills = payload.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // parse projects if string
    if (payload.projects && typeof payload.projects === "string") {
      payload.projects = JSON.parse(payload.projects);
    }

    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      const user = await User.findById(userId).select("name email").lean();
      profile = new Profile({
        user: userId,
        name: payload.name || user?.name || "",
        email: payload.email || user?.email || "",
        ...payload,
      });

      if (req.file) profile.resumeFile = `/uploads/${req.file.filename}`;
      await profile.save();
      return res.json(profile);
    }

    // ✅ Replace projects and other arrays instead of merging
    const keysToReplace = ["projects", "work"];
    keysToReplace.forEach((key) => {
      if (payload[key]) profile[key] = payload[key];
    });

    // ✅ Assign other non-array fields
    Object.keys(payload).forEach((key) => {
      if (!keysToReplace.includes(key)) profile[key] = payload[key];
    });

    if (req.file) profile.resumeFile = `/uploads/${req.file.filename}`;
    await profile.save();

    res.json(profile);
  } catch (err) {
    next(err);
  }
};
