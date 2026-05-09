// src/modules/promotion/coupon.model.js
const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
{
  code: String,
  discount: Number,
  tenantId: { type: String, required: true, index: true },
},
{ timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);    