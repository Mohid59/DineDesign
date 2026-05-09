exports.sendWhatsapp = async ({ to, message }) => {
  // Stub for real WhatsApp integration
  return { provider: "whatsapp", to, message, status: "sent" };
};
