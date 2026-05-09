const mongoose = require("mongoose");
const { mongoUri } = require("../config/db");

async function connectDatabase() {
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri);

  return mongoose.connection;
}

module.exports = { connectDatabase };
