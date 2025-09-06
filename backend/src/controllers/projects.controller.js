const Profile = require("../models/Profile");

exports.listProjects = async (req, res, next) => {
  try {
    const { skill, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const match = {};
    if (skill) {
      match.skills = { $regex: new RegExp(skill, "i") };
    }

    const profiles = await Profile.find(match)
      .select("projects skills name email")
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

  
    const results = [];
    profiles.forEach((p) => {
      (p.projects || []).forEach((proj) => {
        results.push({
          ...proj,
          owner: {
            name: p.name,
            email: p.email,
            skills: p.skills || [],
          },
        });
      });
    });

    res.json(results);
  } catch (err) {
    next(err);
  }
};


exports.topSkills = async (req, res, next) => {
  try {
    const agg = await Profile.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    res.json(agg.map((r) => ({ skill: r._id, count: r.count })));
  } catch (err) {
    next(err);
  }
};

exports.searchAll = async (req, res, next) => {
  try {
    const q = req.query.q || "";
    if (!q)
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });

    const regex = new RegExp(q, "i");

    const profiles = await Profile.find({
      $or: [
        { name: regex },
        { education: regex },
        { "projects.title": regex },
        { "projects.description": regex },
        { skills: regex },
      ],
    })
      .select("projects skills name email education")
      .lean();

    const results = [];
    profiles.forEach((p) => {
      (p.projects || []).forEach((proj) => {
        if (
          regex.test(p.name) ||
          regex.test(p.education || "") ||
          regex.test(proj.title || "") ||
          regex.test(proj.description || "") ||
          (p.skills || []).some((s) => regex.test(s))
        ) {
          results.push({
            ...proj,
            owner: {
              name: p.name,
              email: p.email,
              skills: p.skills || [],
            },
          });
        }
      });
    });

    res.json(results);
  } catch (err) {
    next(err);
  }
};
