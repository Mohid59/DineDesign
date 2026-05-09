const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const rbac = require("../../core/roles/rbac.middleware");
const ctrl = require("./dashboard.controller");

router.get("/", auth, rbac("admin", "staff"), ctrl.dashboard);

module.exports = router;

