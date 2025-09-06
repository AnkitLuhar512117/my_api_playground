const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

module.exports = function authMiddleware(req, res, next) {
  const hdr = req.headers.authorization;

  if (!hdr) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  const token = hdr.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
