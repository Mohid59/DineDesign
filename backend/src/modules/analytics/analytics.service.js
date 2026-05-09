// src/modules/analytics/analytics.service.js
const Order = require("../order/order.model");

exports.getStats = async (tenantId) => {
  const totalOrders = await Order.countDocuments({ tenantId });
  return { totalOrders };
};