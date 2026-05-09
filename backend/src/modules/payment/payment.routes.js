const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const ctrl = require("./payment.controller");

router.post("/pay", auth, ctrl.payOrder);

module.exports = router;
