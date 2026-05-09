exports.sendSms = async ({ to, message }) => {
  // Stub for real SMS integration
  return { provider: "sms", to, message, status: "sent" };
};
