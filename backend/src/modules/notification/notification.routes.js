const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const rbac = require("../../core/roles/rbac.middleware");
const ctrl = require("./notification.controller");

router.get("/", auth, rbac("admin", "staff"), ctrl.list);
router.post("/send", auth, rbac("admin", "staff"), ctrl.create);
router.post("/process", auth, rbac("admin", "staff"), ctrl.process);

module.exports = router;

