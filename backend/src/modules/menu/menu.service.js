const MenuItem = require("./menu.model");
const Category = require("./category.model");

async function createCategory({ name, tenantId }) {
  return Category.create({ name, tenantId });
}

async function listCategories({ tenantId }) {
  return Category.find({ tenantId }).sort({ name: 1 });
}

async function createMenuItem({ tenantId, payload }) {
  return MenuItem.create({ ...payload, tenantId });
}

async function listMenuItems({ tenantId }) {
  return MenuItem.find({ tenantId }).sort({ createdAt: -1 });
}

async function updateMenuItem({ tenantId, id, payload }) {
  return MenuItem.findOneAndUpdate({ _id: id, tenantId }, payload, { new: true });
}

async function deleteMenuItem({ tenantId, id }) {
  return MenuItem.findOneAndDelete({ _id: id, tenantId });
}

module.exports = {
  createCategory,
  listCategories,
  createMenuItem,
  listMenuItems,
  updateMenuItem,
  deleteMenuItem,
};

