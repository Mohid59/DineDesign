module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  const name = err.name || "";
  const msg = String(err.message || "");

  if (msg === "MONGO_URI is not set" || msg.includes("MONGO_URI")) {
    status = 503;
    message =
      "Database is not configured: set MONGO_URI on the backend service (Vercel → Backend → Environment Variables).";
  } else if (
    name === "MongoServerSelectionError" ||
    name === "MongoNetworkError" ||
    name === "MongooseServerSelectionError" ||
    msg.includes("ECONNREFUSED") ||
    msg.includes("ENOTFOUND")
  ) {
    status = 503;
    message =
      "Cannot reach the database. Use a public MongoDB URI (e.g. Atlas), and in Atlas → Network Access allow 0.0.0.0/0 (or Vercel’s ranges).";
  }

  // eslint-disable-next-line no-console
  console.error(err);
  res.status(status).json({ success: false, message });
};
