const mongoose = require("mongoose");
const { mongoUri } = require("../config/db");

const connectOptions = {
  serverSelectionTimeoutMS: 10_000,
};

async function connectDatabase() {
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, connectOptions);

  return mongoose.connection;
}

/** Re-connect after idle / cold instances (important on hosted platforms). */
async function ensureConnected() {
  if (!mongoUri) {
    const err = new Error("MONGO_URI is not set");
    err.statusCode = 503;
    throw err;
  }
  if (mongoose.connection.readyState === 1) return;
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, connectOptions);
}

module.exports = { connectDatabase, ensureConnected };
