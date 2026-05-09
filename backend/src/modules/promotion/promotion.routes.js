const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const rbac = require("../../core/roles/rbac.middleware");
const ctrl = require("./promotion.controller");

router.get("/coupons", auth, rbac("admin", "staff"), ctrl.listCoupons);
router.post("/coupons", auth, rbac("admin", "staff"), ctrl.createCoupon);

module.exports = router;
