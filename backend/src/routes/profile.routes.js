
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const profileCtrl = require("../controllers/profile.controller");

router.get("/me", authMiddleware, profileCtrl.getMyProfile);

router.put(
  "/me",
  authMiddleware,
  upload.single("resume"),
  profileCtrl.updateMyProfile
);

module.exports = router;
