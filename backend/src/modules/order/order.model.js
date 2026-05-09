// src/modules/order/order.model.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  items: [
    {
      menuId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  templateId: String,
  templateName: String,
  templateCategory: String,
  templateStyle: String,
  billingPreference: {
    type: String,
    enum: ["full", "subscription"],
    default: "full",
  },
  isCustomized: {
    type: Boolean,
    default: false,
  },
  customizedBrandName: String,
  customizedTheme: mongoose.Schema.Types.Mixed,
  layoutStyle: String,
  paymentMethod: String,
  clientDetails: {
    accountName: String,
    accountEmail: String,
    businessName: String,
    ownerName: String,
    phoneNumber: String,
    launchDate: String,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "preparing", "delivered"],
    default: "pending",
  },
  userId: { type: String, required: true, index: true },
  tenantId: { type: String, required: true, index: true },
},
{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);