// src/modules/order/order.controller.js
const Order = require("./order.model");
const asyncHandler = require("../../core/utils/asyncHandler");
const { created, ok } = require("../../core/utils/apiResponse");
const notificationService = require("../notification/notification.service");

exports.createOrder = asyncHandler(async (req, res) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ success: false, message: "Only clients can place template orders" });
  }

  const order = await Order.create({
    ...req.body,
    tenantId: req.tenantId,
    userId: req.user.id,
  });

  await notificationService.createNotification({
    tenantId: req.tenantId,
    createdBy: req.user.id,
    channel: "system",
    to: "admin",
    message: `New ${order.isCustomized ? "customized " : ""}order placed for ${order.templateName || "template"} by ${order.clientDetails?.accountName || "client"}.`,
  });

  return created(res, order, "Order created");
});

exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $match: {
        tenantId: req.tenantId,
        templateId: { $exists: true, $ne: "" },
      },
    },
    {
      $lookup: {
        from: "users",
        let: { orderUserId: "$userId", tenantId: "$tenantId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $toString: "$_id" }, "$$orderUserId"] },
                  { $eq: ["$tenantId", "$$tenantId"] },
                ],
              },
            },
          },
          {
            $project: {
              role: 1,
            },
          },
        ],
        as: "orderUser",
      },
    },
    {
      $match: {
        "orderUser.0.role": "customer",
      },
    },
    {
      $project: {
        orderUser: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  return ok(res, orders, "Orders");
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  return ok(res, order, "Order updated");
});