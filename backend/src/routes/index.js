// src/routes/index.js
const router = require("express").Router();
const tenant = require("../core/tenant/tenant.middleware");
// src/app.js

router.use(tenant);

router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/templates", require("../modules/template/template.routes"));
router.use("/users", require("../modules/user/user.routes"));
router.use("/menu", require("../modules/menu/menu.routes"));
router.use("/order", require("../modules/order/order.routes"));
router.use("/reservation", require("../modules/reservation/reservation.routes"));
router.use("/payment", require("../modules/payment/payment.routes"));
router.use("/promotion", require("../modules/promotion/promotion.routes"));
router.use("/notification", require("../modules/notification/notification.routes"));
router.use("/ai", require("../modules/ai/ai.routes"));
router.use("/analytics", require("../modules/analytics/analytics.routes"));
router.use("/tenant-admin", require("../modules/tenant-admin/dashboard.routes"));
router.use("/admin-access", require("../modules/admin-access/admin-access.routes"));

module.exports = router;