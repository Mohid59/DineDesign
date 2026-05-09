const mongoose = require("mongoose");

const adminAccessSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true, unique: true, index: true },
    adminEmails: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminAccess", adminAccessSchema);
