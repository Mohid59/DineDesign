const Reservation = require("./reservation.model");
const asyncHandler = require("../../core/utils/asyncHandler");
const { created, ok } = require("../../core/utils/apiResponse");

exports.createReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.create({
    ...req.body,
    tenantId: req.tenantId,
    userId: req.user.id,
  });
  return created(res, reservation, "Reservation created");
});

exports.listReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ tenantId: req.tenantId }).sort({ createdAt: -1 });
  return ok(res, reservations, "Reservations");
});