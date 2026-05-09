// src/modules/reservation/reservation.model.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
{
  date: Date,
  time: String,
  people: Number,
  userId: { type: String, required: true, index: true },
  tenantId: { type: String, required: true, index: true },
},
{ timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);