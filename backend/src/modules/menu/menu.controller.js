const asyncHandler = require("../../core/utils/asyncHandler");
const { created, ok } = require("../../core/utils/apiResponse");
const menuService = require("./menu.service");

exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body || {};
  const category = await menuService.createCategory({ name, tenantId: req.tenantId });
  return created(res, category, "Category created");
});

exports.listCategories = asyncHandler(async (req, res) => {
  const categories = await menuService.listCategories({ tenantId: req.tenantId });
  return ok(res, categories, "Categories");
});

exports.createMenuItem = asyncHandler(async (req, res) => {
  const item = await menuService.createMenuItem({ tenantId: req.tenantId, payload: req.body || {} });
  return created(res, item, "Menu item created");
});

exports.listMenuItems = asyncHandler(async (req, res) => {
  const items = await menuService.listMenuItems({ tenantId: req.tenantId });
  return ok(res, items, "Menu items");
});

exports.updateMenuItem = asyncHandler(async (req, res) => {
  const updated = await menuService.updateMenuItem({
    tenantId: req.tenantId,
    id: req.params.id,
    payload: req.body || {},
  });
  return ok(res, updated, "Menu item updated");
});

exports.deleteMenuItem = asyncHandler(async (req, res) => {
  const deleted = await menuService.deleteMenuItem({ tenantId: req.tenantId, id: req.params.id });
  return ok(res, deleted, "Menu item deleted");
});

