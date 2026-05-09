const asyncHandler = require("../../core/utils/asyncHandler");
const { created, ok } = require("../../core/utils/apiResponse");
const promotionService = require("./promotion.service");

exports.createCoupon = asyncHandler(async (req, res) => {
  const { code, discount } = req.body || {};
  const coupon = await promotionService.createCoupon({ code, discount, tenantId: req.tenantId });
  return created(res, coupon, "Coupon created");
});

exports.listCoupons = asyncHandler(async (req, res) => {
  const coupons = await promotionService.listCoupons({ tenantId: req.tenantId });
  return ok(res, coupons, "Coupons");
});
