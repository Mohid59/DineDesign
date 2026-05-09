const Coupon = require("./coupon.model");

async function createCoupon({ code, discount, tenantId }) {
  const coupon = await Coupon.create({ code: code.toUpperCase(), discount, tenantId });
  return coupon;
}

async function listCoupons({ tenantId }) {
  return Coupon.find({ tenantId }).sort({ createdAt: -1 });
}

module.exports = { createCoupon, listCoupons };
