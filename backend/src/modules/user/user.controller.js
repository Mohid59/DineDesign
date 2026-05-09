const asyncHandler = require("../../core/utils/asyncHandler");
const { ok } = require("../../core/utils/apiResponse");
const userService = require("./user.service");

exports.listUsers = asyncHandler(async (req, res) => {
  const users = await userService.listUsers({ tenantId: req.tenantId });
  return ok(res, users, "Users");
});

exports.me = asyncHandler(async (req, res) => {
  const user = await userService.getMe({ userId: req.user.id, tenantId: req.tenantId });
  return ok(res, user, "Me");
});

