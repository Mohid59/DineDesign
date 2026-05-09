const asyncHandler = require("../../core/utils/asyncHandler");
const { created, ok } = require("../../core/utils/apiResponse");
const authService = require("./auth.service");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body || {};
  const user = await authService.register({
    name,
    email,
    password,
    role,
    tenantId: req.tenantId,
  });
  return created(res, { id: user._id, email: user.email, role: user.role }, "Registered");
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  const { user, token } = await authService.login({ email, password, tenantId: req.tenantId });
  return ok(res, { token, user: { id: user._id, email: user.email, role: user.role, name: user.name } }, "Logged in");
});
