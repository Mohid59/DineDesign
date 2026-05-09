const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");
const logger = require("./middleware/logger.middleware");
// src/app.js

const app = express();

app.use(logger); // 👈 ADD THIS BEFORE ROUTES

// Vercel Services: requests arrive as /_/backend/api/... — strip prefix so /api routes match.
const VERCEL_BACKEND_PREFIX = "/_/backend";
app.use((req, res, next) => {
  const url = req.originalUrl || req.url || "";
  if (url === VERCEL_BACKEND_PREFIX || url.startsWith(`${VERCEL_BACKEND_PREFIX}/`) || url.startsWith(`${VERCEL_BACKEND_PREFIX}?`)) {
    req.url = url.slice(VERCEL_BACKEND_PREFIX.length) || "/";
  }
  next();
});

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, message: "Backend is running" });
});

app.use("/api", routes);

app.use(errorMiddleware);

module.exports = app;
