// src/modules/order/order.routes.js
const router = require("express").Router();
const ctrl = require("./order.controller");
const auth = require("../../middleware/auth.middleware");
const rbac = require("../../core/roles/rbac.middleware");

router.post("/", auth, ctrl.createOrder);
router.get("/", auth, rbac("admin", "staff"), ctrl.getOrders);
router.put("/:id", auth, rbac("admin", "staff"), ctrl.updateStatus);

module.exports = router;