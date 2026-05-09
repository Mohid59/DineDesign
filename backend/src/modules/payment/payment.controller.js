// controller
const paymentService = require("./payment.service");

exports.payOrder = async (req, res) => {
  const result = await paymentService.processPayment(req.body);
  res.json(result);
};