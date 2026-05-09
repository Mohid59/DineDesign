const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const rbac = require("../../core/roles/rbac.middleware");
const asyncHandler = require("../../core/utils/asyncHandler");
const { ok } = require("../../core/utils/apiResponse");
const analyticsService = require("./analytics.service");

router.get(
  "/stats",
  auth,
  rbac("admin", "staff"),
  asyncHandler(async (req, res) => {
    const stats = await analyticsService.getStats(req.tenantId);
    return ok(res, stats, "Analytics");
  })
);

module.exports = router;
