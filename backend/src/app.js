require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const apiRoutes = require("./routes/api.routes");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

app.get("/health", (req, res) =>
  res.json({ status: "ok", time: new Date().toISOString() })
);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", apiRoutes);

app.use(errorMiddleware);

module.exports = app;
