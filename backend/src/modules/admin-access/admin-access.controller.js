const asyncHandler = require("../../core/utils/asyncHandler");
const { ok } = require("../../core/utils/apiResponse");
const adminAccessService = require("./admin-access.service");

exports.getAdminEmails = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const envEmails = adminAccessService.getEnvAdminEmails();
  const managedEmails = await adminAccessService.listManageableAdminEmails(tenantId);
  const effectiveEmails = await adminAccessService.getEffectiveAdminEmails(tenantId);
  return ok(
    res,
    {
      envEmails,
      managedEmails,
      effectiveEmails,
    },
    "Admin emails fetched"
  );
});

exports.addAdminEmail = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const { email } = req.body || {};
  const managedEmails = await adminAccessService.addAdminEmail(tenantId, email);
  const effectiveEmails = await adminAccessService.getEffectiveAdminEmails(tenantId);
  return ok(
    res,
    {
      managedEmails,
      effectiveEmails,
    },
    "Admin email added"
  );
});

exports.removeAdminEmail = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const { email } = req.body || {};
  const managedEmails = await adminAccessService.removeAdminEmail(tenantId, email);
  const effectiveEmails = await adminAccessService.getEffectiveAdminEmails(tenantId);
  return ok(
    res,
    {
      managedEmails,
      effectiveEmails,
    },
    "Admin email removed"
  );
});
