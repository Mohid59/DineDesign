const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const ctrl = require("./reservation.controller");

router.get("/", auth, ctrl.listReservations);
router.post("/", auth, ctrl.createReservation);

module.exports = router;
