const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const rbac = require("../../core/roles/rbac.middleware");
const ctrl = require("./admin-access.controller");

router.get("/emails", auth, rbac("admin"), ctrl.getAdminEmails);
router.post("/emails", auth, rbac("admin"), ctrl.addAdminEmail);
router.delete("/emails", auth, rbac("admin"), ctrl.removeAdminEmail);

module.exports = router;
