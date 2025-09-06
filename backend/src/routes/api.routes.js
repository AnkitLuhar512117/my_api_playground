const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const profileCtrl = require("../controllers/profile.controller");
const projectsCtrl = require("../controllers/projects.controller");

// Profile routes (auth required)
router.get("/profile/me", authMiddleware, profileCtrl.getMyProfile);
router.put("/profile/me", authMiddleware, profileCtrl.updateMyProfile);

// Projects queries
router.get("/projects", projectsCtrl.listProjects);
router.get("/skills/top", projectsCtrl.topSkills);

// Search
router.get("/search", projectsCtrl.searchAll);

module.exports = router;
