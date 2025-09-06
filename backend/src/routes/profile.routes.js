// src/routes/profile.routes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const profileCtrl = require("../controllers/profile.controller");

// public or protected as you need:
router.get("/me", authMiddleware, profileCtrl.getMyProfile);

// update profile (auth + optional resume file)
router.put(
  "/me",
  authMiddleware,
  upload.single("resume"),
  profileCtrl.updateMyProfile
);

module.exports = router;
