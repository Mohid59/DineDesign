const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const rbac = require("../../core/roles/rbac.middleware");
const ctrl = require("./user.controller");

router.get("/me", auth, ctrl.me);
router.get("/", auth, rbac("admin", "staff"), ctrl.listUsers);

module.exports = router;

