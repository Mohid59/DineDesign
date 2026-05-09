const Order = require("../order/order.model");
const Reservation = require("../reservation/reservation.model");
const Coupon = require("../promotion/coupon.model");
const User = require("../user/user.model");

async function getDashboard({ tenantId }) {
  const [orders, reservations, coupons, users] = await Promise.all([
    Order.countDocuments({ tenantId }),
    Reservation.countDocuments({ tenantId }),
    Coupon.countDocuments({ tenantId }),
    User.countDocuments({ tenantId }),
  ]);

  return {
    totals: {
      orders,
      reservations,
      coupons,
      users,
    },
  };
}

module.exports = { getDashboard };

