const asyncHandler = require("../../core/utils/asyncHandler");
const { ok } = require("../../core/utils/apiResponse");
const dashboardService = require("./dashboard.service");

exports.dashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboard({ tenantId: req.tenantId });
  return ok(res, data, "Dashboard");
});