const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    channel: { type: String, enum: ["sms", "whatsapp", "system"], default: "system" },
    to: { type: String, required: true },
    message: { type: String, required: true },
    tenantId: { type: String, required: true, index: true },
    createdBy: { type: String, required: true },
    status: { type: String, enum: ["queued", "sent", "failed"], default: "queued" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);

