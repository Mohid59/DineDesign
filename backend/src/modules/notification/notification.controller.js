const asyncHandler = require("../../core/utils/asyncHandler");
const { created, ok } = require("../../core/utils/apiResponse");
const notificationService = require("./notification.service");

exports.create = asyncHandler(async (req, res) => {
  const { channel, to, message } = req.body || {};
  const record = await notificationService.createNotification({
    tenantId: req.tenantId,
    createdBy: req.user.id,
    channel: channel || "system",
    to,
    message,
  });
  return created(res, record, "Notification queued");
});

exports.list = asyncHandler(async (req, res) => {
  const list = await notificationService.listNotifications({ tenantId: req.tenantId });
  return ok(res, list, "Notifications");
});

exports.process = asyncHandler(async (req, res) => {
  const results = await notificationService.processQueueOnce();
  return ok(res, results, "Queue processed");
});

