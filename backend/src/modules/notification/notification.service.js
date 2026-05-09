const Notification = require("./notification.model");
const queue = require("./notification.queue");
const sms = require("./sms.service");
const whatsapp = require("./whatsapp.service");

async function createNotification({ tenantId, createdBy, channel, to, message }) {
  const record = await Notification.create({
    tenantId,
    createdBy,
    channel,
    to,
    message,
    status: "queued",
  });

  queue.enqueue({ notificationId: record._id.toString(), channel, to, message });
  return record;
}

async function listNotifications({ tenantId }) {
  return Notification.find({ tenantId }).sort({ createdAt: -1 });
}

async function processQueueOnce() {
  const jobs = queue.drain();
  const results = [];

  for (const job of jobs) {
    const record = await Notification.findById(job.notificationId);
    if (!record) continue;

    try {
      if (job.channel === "sms") await sms.sendSms({ to: job.to, message: job.message });
      if (job.channel === "whatsapp") await whatsapp.sendWhatsapp({ to: job.to, message: job.message });
      record.status = "sent";
      await record.save();
      results.push({ id: record._id, status: "sent" });
    } catch (e) {
      record.status = "failed";
      await record.save();
      results.push({ id: record._id, status: "failed" });
    }
  }

  return results;
}

module.exports = { createNotification, listNotifications, processQueueOnce };