// src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const authCtrl = require("../controllers/auth.controller");

// Register expects multipart/form-data (for resume)
router.post("/register", upload.single("resume"), authCtrl.register);
router.post("/login", express.json(), authCtrl.login);

module.exports = router;
