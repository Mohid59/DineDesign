const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");
const logger = require("./middleware/logger.middleware");
// src/app.js

const app = express();

app.use(logger); // 👈 ADD THIS BEFORE ROUTES


app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, message: "Backend is running" });
});

app.use("/api", routes);

app.use(errorMiddleware);

module.exports = app;
