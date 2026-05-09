const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory", required: true },
    imageUrl: { type: String, default: "" },
    tenantId: { type: String, required: true, index: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

menuItemSchema.index({ tenantId: 1, name: 1 });

module.exports = mongoose.model("MenuItem", menuItemSchema);

