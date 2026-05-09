const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tenantId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

categorySchema.index({ tenantId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("MenuCategory", categorySchema);

